# 🚀 Deploy Expense Tracker to Vercel - Step by Step Guide

This guide will help you deploy your Expense Tracker application to Vercel.

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas Account** (free tier available) - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

Since Vercel is serverless, you need a cloud database. MongoDB Atlas is free and perfect for this.

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up
3. Verify your email

### 1.2 Create a Cluster
1. Choose **FREE (M0)** cluster
2. Select a cloud provider (AWS recommended)
3. Choose a region closest to you
4. Click "Create Cluster" (takes 3-5 minutes)

### 1.3 Create Database User
1. Go to **Database Access** → **Add New Database User**
2. Choose **Password** authentication
3. Username: `xpense-user` (or your choice)
4. Password: Create a strong password (save it!)
5. Database User Privileges: **Read and write to any database**
6. Click "Add User"

### 1.4 Configure Network Access
1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This allows Vercel to connect
3. Click "Confirm"

### 1.5 Get Connection String
1. Go to **Database** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `xpense-tracker` (or your database name)

**Example connection string:**
```
mongodb+srv://xpense-user:yourpassword@cluster0.xxxxx.mongodb.net/xpense-tracker?retryWrites=true&w=majority
```

---

## Step 2: Prepare Your Project for Vercel

### 2.1 Update Project Structure

The project is already set up with the necessary files. Verify you have:
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/index.js` - Serverless function entry point
- ✅ `package.json` - Dependencies

### 2.2 Update Environment Variables Locally (Optional)

Create/update `.env` file with your MongoDB Atlas connection:

```env
MONGODB_URI=mongodb+srv://xpense-user:yourpassword@cluster0.xxxxx.mongodb.net/xpense-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
PORT=3000
NODE_ENV=production
```

**⚠️ Important:** Never commit `.env` to Git! It's already in `.gitignore`.

---

## Step 3: Push Code to GitHub

### 3.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Expense Tracker"
```

### 3.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"**
3. Repository name: `xpense-tracker` (or your choice)
4. Description: "Expense Tracker Web Application"
5. Choose **Public** (or Private if you have GitHub Pro)
6. **Don't** initialize with README (you already have one)
7. Click **"Create repository"**

### 3.3 Push Code to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/yourusername/xpense-tracker.git

# Push code
git branch -M main
git push -u origin main
```

Replace `yourusername` with your GitHub username.

---

## Step 4: Deploy to Vercel

### 4.1 Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### 4.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `xpense-tracker` repository
3. Click **"Import"**

### 4.3 Configure Project

1. **Project Name:** `xpense-tracker` (or your choice)
2. **Framework Preset:** Other (or leave as default)
3. **Root Directory:** `./` (root)

### 4.4 Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://xpense-user:yourpassword@cluster0.xxxxx.mongodb.net/xpense-tracker?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-to-random-string` |
| `NODE_ENV` | `production` |

**⚠️ Important:** 
- Replace `yourpassword` with your actual MongoDB Atlas password
- Replace the cluster URL with your actual MongoDB Atlas connection string
- Use a strong, random string for `JWT_SECRET`

### 4.5 Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. You'll see a success message with your deployment URL

---

## Step 5: Update Frontend API URL (if needed)

The frontend might need to know the production API URL. Let's check and update if necessary.

### 5.1 Check Current API Configuration

The frontend uses `http://localhost:3000/api` in development. In production, Vercel will handle this automatically, but we should make it dynamic.

### 5.2 Update Frontend to Use Environment-Based URLs

We'll update the frontend to automatically detect the API URL.

---

## Step 6: Test Your Deployment

1. Visit your Vercel deployment URL (e.g., `https://xpense-tracker.vercel.app`)
2. Test the following:
   - ✅ Register a new user
   - ✅ Login
   - ✅ Add expenses
   - ✅ View charts
   - ✅ Filter expenses

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
- Verify MongoDB Atlas connection string is correct
- Check that IP address `0.0.0.0/0` is allowed in Network Access
- Verify database user credentials are correct
- Check Vercel environment variables are set correctly

### Issue: API Routes Not Working

**Solution:**
- Verify `vercel.json` configuration is correct
- Check that `api/index.js` exists and exports the app correctly
- Check Vercel deployment logs for errors

### Issue: Frontend Not Loading

**Solution:**
- Verify `frontend/` directory structure is correct
- Check that static files are being served
- Check browser console for errors

### Issue: CORS Errors

**Solution:**
- Verify CORS is enabled in `api/index.js`
- Check that API URLs match between frontend and backend

---

## 📝 Additional Configuration

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

### Environment Variables Updates

To update environment variables:
1. Go to Vercel project settings
2. Click **"Environment Variables"**
3. Edit or add variables
4. Redeploy the application

### Monitoring and Logs

1. Go to your Vercel project dashboard
2. Click **"Deployments"** to see deployment history
3. Click on a deployment to see logs
4. Use **"Functions"** tab to see serverless function logs

---

## 🎉 Success!

Your Expense Tracker is now live on Vercel! 

**Your deployment URL will be:**
```
https://your-project-name.vercel.app
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions)

---

## 🔄 Updating Your Deployment

Whenever you push changes to GitHub:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Vercel automatically deploys:**
   - Vercel watches your GitHub repository
   - Automatically deploys on every push to main branch
   - You'll get a new deployment URL for each update

---

## 💡 Pro Tips

1. **Use Vercel Preview Deployments:** Each pull request gets a preview URL
2. **Monitor Usage:** Check Vercel dashboard for usage and limits
3. **Set Up Alerts:** Configure alerts for deployment failures
4. **Use Vercel Analytics:** Enable analytics to track performance

---

**Happy Deploying! 🚀**

