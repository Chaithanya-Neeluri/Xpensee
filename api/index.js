// Vercel serverless function entry point
// This file handles all API routes for Vercel deployment

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('../backend/routes/authRoutes');
const expenseRoutes = require('../backend/routes/expenseRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// MongoDB connection (for serverless, we need to handle connection differently)
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB with serverless-friendly connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = client;
    console.log('✅ MongoDB connected successfully');
    return cachedDb;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Connect before handling requests
app.use(async (req, res, next) => {
  if (!cachedDb) {
    await connectToDatabase();
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Export for Vercel
module.exports = app;

