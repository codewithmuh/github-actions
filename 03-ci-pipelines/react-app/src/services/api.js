import axios from 'axios';

// API base URL - can be configured via environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || error.response.data?.message || 'Server error';
      throw new Error(`${error.response.status}: ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to connect to server');
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

// Mock data for development/testing when API is not available
const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'user' },
];

// Helper function to use mock data when API is unavailable
const useMockData = (apiCall, mockData) => {
  return apiCall.catch(error => {
    console.warn('API unavailable, using mock data:', error.message);
    return { data: mockData };
  });
};

// API functions
export const getUsers = async () => {
  try {
    const response = await useMockData(api.get('/users'), mockUsers);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const mockUser = mockUsers.find(u => u.id === parseInt(id));
    const response = await useMockData(api.get(`/users/${id}`), mockUser);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const mockNewUser = {
      id: Date.now(),
      ...userData,
      created_at: new Date().toISOString()
    };
    
    const response = await useMockData(api.post('/users', userData), mockNewUser);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const mockUpdatedUser = {
      id: parseInt(id),
      ...userData,
      updated_at: new Date().toISOString()
    };
    
    const response = await useMockData(api.put(`/users/${id}`, userData), mockUpdatedUser);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await useMockData(
      api.delete(`/users/${id}`), 
      { message: 'User deleted', user: mockUsers.find(u => u.id === parseInt(id)) }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

// Health check function
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;