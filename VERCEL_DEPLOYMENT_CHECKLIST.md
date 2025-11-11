# ✅ Vercel Deployment Checklist

## Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Create database user with password
- [ ] Configure network access (allow 0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection string locally

### 2. Code Preparation
- [ ] All code is committed to Git
- [ ] `.env` is in `.gitignore` (already done)
- [ ] `vercel.json` exists and is configured
- [ ] `api/index.js` exists for serverless functions
- [ ] Frontend API URLs use `window.location.origin` (already updated)
- [ ] All dependencies are in `package.json`

### 3. GitHub Repository
- [ ] Code is pushed to GitHub
- [ ] Repository is public or you have GitHub Pro for private repos
- [ ] Repository name is set

### 4. Vercel Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub
- [ ] Environment variables set in Vercel:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`

### 5. Deployment
- [ ] Deployment started
- [ ] Deployment completed successfully
- [ ] No errors in deployment logs
- [ ] Application URL received

### 6. Testing
- [ ] Visit deployment URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test adding expenses
- [ ] Test viewing expenses
- [ ] Test charts display
- [ ] Test filters work
- [ ] Test logout

## Post-Deployment

### 7. Verify
- [ ] Application is accessible
- [ ] API endpoints work (`/api/health`)
- [ ] Database connection works
- [ ] Frontend loads correctly
- [ ] No console errors in browser

### 8. Optional
- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up deployment notifications
- [ ] Configure environment variables for different environments

## Troubleshooting

If deployment fails:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Check MongoDB Atlas connection string
4. Verify `vercel.json` configuration
5. Check `api/index.js` for errors
6. Verify all dependencies are in `package.json`

## Quick Commands

```bash
# Push code to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main

# Check deployment status
# Visit Vercel dashboard
```

---

**Ready to deploy?** Follow the steps in `DEPLOY_VERCEL.md`!

