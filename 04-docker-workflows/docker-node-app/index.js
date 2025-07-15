const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🐳 Hello from Dockerized Node.js App!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    container: {
      hostname: require('os').hostname(),
      platform: process.platform,
      nodeVersion: process.version
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'docker-node-app',
    environment: process.env.NODE_ENV || 'development',
    container: {
      id: require('os').hostname(),
      platform: process.platform,
      arch: process.arch
    },
    resources: {
      memory: process.memoryUsage(),
      uptime: process.uptime()
    }
  });
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
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🐳 Container ID: ${require('os').hostname()}`);
});

module.exports = app;