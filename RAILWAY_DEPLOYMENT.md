# 🚂 Railway Deployment Guide (Recommended for Django)

## Why Railway Instead of Vercel?

Railway is **much better** for Django projects:
- ✅ Native Django support
- ✅ Built-in PostgreSQL database
- ✅ Easier configuration
- ✅ Better for long-running processes
- ✅ Free tier available

Vercel is designed for serverless/static sites, not Django.

## Quick Deployment Steps

### 1. Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Verify your account

### 2. Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `Haditech2/kogiuncoveredtv`
4. Railway will auto-detect Django

### 3. Add PostgreSQL Database

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create and link it automatically

### 4. Add Environment Variables

Click on your Django service → Variables tab:

```
SECRET_KEY=django-insecure-kogiuncovered-tv-2024-secret-key-change-in-production
DEBUG=False
ALLOWED_HOSTS=.railway.app,.kogiuncovered.online
CLOUDINARY_CLOUD_NAME=ded3xrpof
CLOUDINARY_API_KEY=724112677748272
CLOUDINARY_API_SECRET=DTIYizyqgyO9bNgvKNNRAeNvZEA
```

**Note**: `DATABASE_URL` is automatically set by Railway!

### 5. Configure Build

Railway auto-detects Django, but you can customize:

**Settings → Deploy**:
- Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- Start Command: `gunicorn kogiuncovered.wsgi:application`

### 6. Deploy

Click "Deploy" - Railway will:
1. Install dependencies
2. Collect static files
3. Start your Django app
4. Give you a URL like: `your-app.railway.app`

### 7. Run Migrations

After first deployment:

1. Go to your service
2. Click "Settings" → "Deploy"
3. Add to Build Command:
```bash
pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
```

Or use Railway CLI:
```bash
railway run python manage.py migrate
```

### 8. Create Admin User

**Option A**: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Create superuser
railway run python manage.py createsuperuser
```

**Option B**: Add to your code
Create a management command or use the `create_admin.py` script.

## Files Needed for Railway

Railway works with your existing setup! No special files needed.

But you can add `railway.json` for custom config:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "gunicorn kogiuncovered.wsgi:application",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Environment Variables Reference

### Required
- `SECRET_KEY` - Django secret key
- `DEBUG` - Set to `False` in production
- `ALLOWED_HOSTS` - `.railway.app` (Railway adds this automatically)

### Database
- `DATABASE_URL` - Automatically set by Railway PostgreSQL

### Cloudinary
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Custom Domain

### Add Your Domain

1. Go to Settings → Networking
2. Click "Generate Domain" for Railway subdomain
3. Or add custom domain:
   - Click "Custom Domain"
   - Enter: `kogiuncovered.online`
   - Add DNS records as shown

### DNS Configuration

Add these records to your domain:

```
Type: CNAME
Name: www
Value: your-app.railway.app

Type: A
Name: @
Value: (Railway will provide IP)
```

## Monitoring & Logs

### View Logs
1. Click on your service
2. Go to "Deployments" tab
3. Click on latest deployment
4. View real-time logs

### Metrics
Railway shows:
- CPU usage
- Memory usage
- Network traffic
- Request count

## Troubleshooting

### Build Fails

Check:
- `requirements.txt` is correct
- Python version compatible
- All dependencies available

### Database Connection Error

- Verify `DATABASE_URL` is set
- Check PostgreSQL service is running
- Ensure migrations ran

### Static Files Not Loading

Add to settings.py:
```python
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

Run:
```bash
python manage.py collectstatic --noinput
```

### App Crashes

Check logs for errors:
- Missing environment variables
- Database connection issues
- Import errors

## Cost

### Free Tier
- $5 credit per month
- Enough for small projects
- Includes PostgreSQL database

### Paid Plans
- Start at $5/month
- More resources
- Better performance

## Advantages Over Vercel

| Feature | Railway | Vercel |
|---------|---------|--------|
| Django Support | ✅ Native | ⚠️ Complex |
| Database | ✅ Built-in | ❌ External only |
| WebSockets | ✅ Yes | ❌ No |
| Long Processes | ✅ Yes | ❌ 10s limit |
| Setup | ✅ Easy | ⚠️ Complex |
| Cost | ✅ $5/month | ⚠️ Can be expensive |

## Alternative: Render.com

If Railway doesn't work, try Render:

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn kogiuncovered.wsgi:application`
5. Add PostgreSQL database
6. Deploy

## Next Steps

1. ✅ Sign up for Railway
2. ✅ Deploy from GitHub
3. ✅ Add PostgreSQL
4. ✅ Set environment variables
5. ✅ Run migrations
6. ✅ Create admin user
7. ✅ Add custom domain
8. ✅ Test your site

---

**Ready to deploy?** Go to https://railway.app and follow the steps above!

**Much easier than Vercel for Django!** 🚂
