# 🔧 Fix Vercel 500 Error

## Check Vercel Logs First

1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Go to **"Deployments"** tab
4. Click on the latest deployment
5. Click **"Functions"** tab
6. Click on the function to see error logs

**The logs will show the exact error!**

## Common Causes & Fixes

### 1. Missing DATABASE_URL

**Check**: Do you have Vercel Postgres database?

**Fix**:
1. Vercel Dashboard → **Storage** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Wait for creation
5. `DATABASE_URL` is automatically added

### 2. Missing Environment Variables

**Check**: Settings → Environment Variables

**Required variables**:
```
SECRET_KEY = django-insecure-kogiuncovered-tv-2024-secret-key
DEBUG = False
DATABASE_URL = (auto-added by Postgres)
CLOUDINARY_CLOUD_NAME = ded3xrpof
CLOUDINARY_API_KEY = 724112677748272
CLOUDINARY_API_SECRET = DTIYizyqgyO9bNgvKNNRAeNvZEA
```

### 3. Database Not Migrated

**Fix**: Run migrations using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Pull env vars
vercel env pull

# Run migrations
python manage.py migrate
```

### 4. ALLOWED_HOSTS Issue

**Check** your settings.py has:
```python
ALLOWED_HOSTS = ['.vercel.app', '.kogiuncovered.online']
```

### 5. Static Files Issue

Vercel doesn't serve Django static files well. You need WhiteNoise.

**Check** `requirements.txt` has:
```
whitenoise==6.6.0
```

**Check** `settings.py` has:
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    ...
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Quick Fix Steps

### Step 1: Check Logs
```
Vercel Dashboard → Deployments → Latest → Functions → View Logs
```

### Step 2: Add Database
```
Vercel Dashboard → Storage → Create Database → Postgres
```

### Step 3: Verify Environment Variables
```
Settings → Environment Variables → Check all are set
```

### Step 4: Redeploy
```
Deployments → Click "Redeploy"
```

### Step 5: Run Migrations
```bash
vercel env pull
python manage.py migrate
```

## Still Getting 500?

### Check These:

1. **Python Version**: Vercel supports Python 3.9
   - Check `vercel.json` has `"runtime": "python3.9"`

2. **Import Errors**: Check all dependencies in `requirements.txt`

3. **Database Connection**: Verify `DATABASE_URL` is set

4. **SECRET_KEY**: Must be set in environment variables

## Alternative: Use Neon Database

If Vercel Postgres has issues, use Neon (free):

1. Go to: https://neon.tech
2. Create account
3. Create database
4. Copy connection string
5. Add to Vercel as `DATABASE_URL`:
   ```
   postgresql://user:pass@host/dbname?sslmode=require
   ```

## What the Logs Might Show

Common errors:

### "No module named 'X'"
**Fix**: Add missing package to `requirements.txt`

### "ALLOWED_HOSTS"
**Fix**: Add `.vercel.app` to ALLOWED_HOSTS

### "Database connection failed"
**Fix**: Check DATABASE_URL is set correctly

### "SECRET_KEY not set"
**Fix**: Add SECRET_KEY to environment variables

## Test Locally First

Before deploying, test with production settings:

```bash
# Set environment variables
export DEBUG=False
export DATABASE_URL=your-db-url
export SECRET_KEY=your-secret

# Test
python manage.py check --deploy
python manage.py runserver
```

## Need More Help?

1. **Share the error logs** from Vercel Functions tab
2. **Check Vercel status**: https://www.vercel-status.com/
3. **Vercel Discord**: https://vercel.com/discord

---

**Most likely issue**: Missing DATABASE_URL or environment variables.

**Check logs first** - they will tell you exactly what's wrong!
