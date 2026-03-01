# 🚀 Vercel Deployment Guide

## Quick Fix for Current Error

The error you're seeing is because Vercel needs proper configuration. I've created the necessary files:

- ✅ `vercel.json` - Vercel configuration
- ✅ `build_files.sh` - Build script
- ✅ `wsgi.py` - WSGI entry point
- ✅ Updated `settings.py` - Added Vercel to ALLOWED_HOSTS

## Push Updated Files to GitHub

```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

## Configure Vercel Environment Variables

Go to your Vercel project settings and add these environment variables:

### Required Variables

```
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=your-database-url
CLOUDINARY_CLOUD_NAME=ded3xrpof
CLOUDINARY_API_KEY=724112677748272
CLOUDINARY_API_SECRET=DTIYizyqgyO9bNgvKNNRAeNvZEA
ALLOWED_HOSTS=.vercel.app,.kogiuncovered.online
```

## Steps to Deploy

### 1. Push to GitHub (Already Done)
```bash
git push origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import from GitHub: `Haditech2/kogiuncoveredtv`
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: Leave empty (uses vercel.json)
   - **Output Directory**: Leave empty

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
SECRET_KEY = django-insecure-kogiuncovered-tv-2024-secret-key
DEBUG = False
DATABASE_URL = postgresql://your-db-url (or use Vercel Postgres)
CLOUDINARY_CLOUD_NAME = ded3xrpof
CLOUDINARY_API_KEY = 724112677748272
CLOUDINARY_API_SECRET = DTIYizyqgyO9bNgvKNNRAeNvZEA
```

### 4. Deploy

Click "Deploy" and wait for build to complete.

## Database Options

### Option 1: Vercel Postgres (Recommended)

1. In Vercel dashboard → Storage → Create Database
2. Select "Postgres"
3. Copy the `DATABASE_URL` 
4. Add to environment variables

### Option 2: External PostgreSQL

Use services like:
- Neon (https://neon.tech) - Free tier
- Supabase (https://supabase.com) - Free tier
- Railway (https://railway.app) - Free tier

## After Deployment

### Run Migrations

Vercel doesn't run migrations automatically. You need to:

1. **Option A**: Use Vercel CLI locally
```bash
vercel env pull
python manage.py migrate
```

2. **Option B**: Add to build_files.sh
```bash
python manage.py migrate --noinput
```

### Create Admin User

You'll need to create admin user manually:

1. Connect to your database
2. Run Django shell or use database GUI
3. Create superuser

Or use a management command in your deployment.

## Troubleshooting

### Error: "externally-managed-environment"

✅ **Fixed** - The new `vercel.json` uses proper Python runtime

### Error: "Module not found"

- Check `requirements.txt` has all dependencies
- Verify Python version in `vercel.json`

### Error: "Static files not found"

- Ensure `build_files.sh` runs collectstatic
- Check `STATIC_ROOT` in settings.py

### Database Connection Error

- Verify `DATABASE_URL` is set in Vercel
- Check database is accessible from Vercel
- Use PostgreSQL (SQLite doesn't work on Vercel)

## Alternative: Railway Deployment

If Vercel continues to have issues, try Railway:

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Add environment variables
5. Deploy

Railway is often easier for Django projects.

## Files Created

- `vercel.json` - Vercel configuration
- `build_files.sh` - Build script  
- `wsgi.py` - WSGI entry point
- `VERCEL_DEPLOYMENT.md` - This guide

## Next Steps

1. ✅ Push updated files to GitHub
2. ✅ Set up database (Vercel Postgres or external)
3. ✅ Add environment variables in Vercel
4. ✅ Deploy
5. ✅ Run migrations
6. ✅ Create admin user
7. ✅ Test your site

---

**Need help?** Check Vercel docs: https://vercel.com/docs
