const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { connectDatabase } = require('./config/database');
const logger = require('./middleware/logger');
const krathongRoutes = require('./routes/krathong.routes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (config.app.env === 'dev') {
  app.use(morgan('dev'));
}
app.use(logger);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Loy Krathong API 2025',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes
app.use('/api/v1', krathongRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    response_code: '0404',
    response_message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    response_code: '0500',
    response_message: 'Internal server error'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start server
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${config.app.env}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// For Vercel serverless deployment
if (process.env.VERCEL) {
  // In Vercel, we export the app without starting the server
  connectDatabase().catch(console.error);
  module.exports = app;
} else {
  // For local development
  startServer();
}
