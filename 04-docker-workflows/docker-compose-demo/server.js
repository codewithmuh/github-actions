const express = require('express');
const { Client } = require('pg');
const redis = require('redis');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Database connection
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/myapp'
});

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Initialize connections
async function initializeConnections() {
  try {
    await dbClient.connect();
    console.log('✅ Connected to PostgreSQL');
    
    await redisClient.connect();
    console.log('✅ Connected to Redis');
    
    // Create tables if they don't exist
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data
    const userCount = await dbClient.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCount.rows[0].count) === 0) {
      await dbClient.query(`
        INSERT INTO users (name, email) VALUES 
        ('John Doe', 'john@example.com'),
        ('Jane Smith', 'jane@example.com'),
        ('Bob Johnson', 'bob@example.com')
      `);
      console.log('✅ Sample data inserted');
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error);
    process.exit(1);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🐳 Hello from Docker Compose Demo!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      database: 'PostgreSQL',
      cache: 'Redis',
      proxy: 'Nginx'
    }
  });
});

app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await dbClient.query('SELECT 1');
    
    // Check Redis connection
    await redisClient.ping();
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        cache: 'connected'
      },
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    // Try to get from cache first
    const cacheKey = 'users:all';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return res.json({
        data: JSON.parse(cached),
        source: 'cache'
      });
    }
    
    // Get from database
    const result = await dbClient.query('SELECT * FROM users ORDER BY id');
    const users = result.rows;
    
    // Cache for 5 minutes
    await redisClient.setEx(cacheKey, 300, JSON.stringify(users));
    
    res.json({
      data: users,
      source: 'database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const result = await dbClient.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    // Clear cache
    await redisClient.del('users:all');
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const userCount = await dbClient.query('SELECT COUNT(*) FROM users');
    const cacheInfo = await redisClient.info('memory');
    
    res.json({
      users: parseInt(userCount.rows[0].count),
      cache: {
        connected: true,
        memory_info: cacheInfo.split('\r\n').slice(0, 5)
      },
      database: {
        connected: true
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  
  try {
    await dbClient.end();
    await redisClient.quit();
    console.log('Connections closed');
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
  
  process.exit(0);
});

// Start server
async function startServer() {
  await initializeConnections();
  
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🐳 Container ID: ${require('os').hostname()}`);
  });
}

startServer().catch(console.error);

module.exports = app;