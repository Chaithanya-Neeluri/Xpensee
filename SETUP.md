# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/xpense-tracker
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3000
   ```

3. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

4. **Start the Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:3000`

## First Time Usage

1. Register a new account
2. Login with your credentials
3. Start adding expenses!
4. View charts and filter by time period or category

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running or check your connection string
- **Port 3000 in use**: Change PORT in .env file
- **Module not found**: Run `npm install` again

