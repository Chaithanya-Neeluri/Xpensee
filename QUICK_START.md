# 🚀 Quick Start Guide

## How to Run the Application

The frontend and backend are integrated - the Express server serves the frontend files. You only need to start one server!

### Prerequisites

1. **Node.js** installed (v14 or higher)
2. **MongoDB** running (local or Atlas)
3. **npm** (comes with Node.js)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/xpense-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
```

### Step 3: Start MongoDB

**If using local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

**If using MongoDB Atlas:**
- No local setup needed, just use your connection string in `.env`

### Step 4: Start the Server (This serves both frontend and backend!)

```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

### Step 5: Open in Browser

Once the server starts, you'll see:
```
🚀 Server running on http://localhost:3000
✅ MongoDB connected successfully
```

**Open your browser and go to:**
- **Login/Register:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard (after login)

---

## That's it! 🎉

The Express server serves:
- Frontend files (HTML, CSS, JS) from the `frontend/` directory
- Backend API endpoints at `/api/auth` and `/api/expenses`

You don't need to run the frontend separately - it's all handled by the Express server!

---

## Troubleshooting

### Port 3000 already in use?
Change the `PORT` in `.env` file to another port (e.g., `PORT=3001`)

### MongoDB connection error?
- Check if MongoDB is running: `mongod` (local) or check your Atlas connection string
- Verify your `.env` file has the correct `MONGODB_URI`

### Module not found errors?
Run `npm install` again to ensure all dependencies are installed

### Frontend not loading?
- Make sure the server is running
- Check browser console for errors
- Verify you're accessing `http://localhost:3000` (or the port you specified)

---

## Project Structure

```
Xpense_Tracker/
├── backend/
│   ├── server.js          # Express server (serves frontend + API)
│   ├── routes/            # API routes
│   ├── models/            # MongoDB models
│   └── middleware/        # Auth middleware
├── frontend/
│   ├── index.html         # Login/Register page
│   ├── dashboard.html     # Expense dashboard
│   ├── styles/            # CSS files
│   └── scripts/           # JavaScript files
└── package.json           # Dependencies
```

The Express server automatically serves all files from the `frontend/` directory as static files!

