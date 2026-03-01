# 🚂 Deploy to Railway - Step by Step

## ✅ Files Ready

I've created all necessary files:
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Start command
- ✅ `runtime.txt` - Python version
- ✅ `requirements.txt` - Dependencies

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

### Step 2: Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub**
4. Authorize Railway to access your repositories

### Step 3: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`Haditech2/kogiuncoveredtv`**
4. Railway will start deploying automatically

### Step 4: Add PostgreSQL Database

1. In your project dashboard, click **"New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will:
   - Create database
   - Generate `DATABASE_URL`
   - Link it to your Django service automatically

### Step 5: Add Environment Variables

Click on your **Django service** → **Variables** tab

Add these variables:

```
SECRET_KEY = django-insecure-kogiuncovered-tv-2024-secret-key-CHANGE-THIS
DEBUG = False
ALLOWED_HOSTS = .railway.app,.kogiuncovered.online
CLOUDINARY_CLOUD_NAME = ded3xrpof
CLOUDINARY_API_KEY = 724112677748272
CLOUDINARY_API_SECRET = DTIYizyqgyO9bNgvKNNRAeNvZEA
```

**Note**: `DATABASE_URL` is automatically added by Railway!

### Step 6: Wait for Deployment

Railway will:
1. ✅ Install dependencies from `requirements.txt`
2. ✅ Run migrations (`python manage.py migrate`)
3. ✅ Collect static files
4. ✅ Start gunicorn server
5. ✅ Give you a URL like: `your-app.up.railway.app`

Watch the logs in real-time!

### Step 7: Create Admin User

After deployment succeeds:

**Option A: Using Railway CLI** (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Or with brew (Mac)
brew install railway

# Login
railway login

# Link to your project
railway link

# Create superuser
railway run python manage.py createsuperuser
```

**Option B: Using Railway Dashboard**

1. Go to your Django service
2. Click **"Settings"** → **"Deploy"**
3. Under **"Custom Start Command"**, temporarily change to:
   ```
   python manage.py createsuperuser --noinput --username admin --email admin@kogiuncovered.com && gunicorn kogiuncovered.wsgi:application
   ```
4. Set environment variable:
   ```
   DJANGO_SUPERUSER_PASSWORD = admin123
   ```
5. Redeploy
6. Change start command back to:
   ```
   gunicorn kogiuncovered.wsgi:application
   ```

**Option C: Add to Database Directly**

Use Railway's PostgreSQL dashboard to run SQL or connect with a database client.

### Step 8: Test Your Site

1. Click on your deployment URL
2. You should see your Django blog!
3. Go to `/login/` to access admin
4. Login with your credentials
5. Go to `/dashboard/` to manage posts

### Step 9: Add Custom Domain (Optional)

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"** for Railway subdomain
3. Or click **"Custom Domain"**
4. Enter: `kogiuncovered.online`
5. Add DNS records as shown:

```
Type: CNAME
Name: www
Value: your-app.up.railway.app

Type: A
Name: @
Value: (Railway provides IP)
```

## 🔧 Configuration Details

### Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `SECRET_KEY` | Your Django secret key | ✅ Yes |
| `DEBUG` | `False` | ✅ Yes |
| `DATABASE_URL` | Auto-set by Railway | ✅ Auto |
| `ALLOWED_HOSTS` | `.railway.app` | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary name | ✅ Yes |
| `CLOUDINARY_API_KEY` | Your Cloudinary key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Your Cloudinary secret | ✅ Yes |

### Build Configuration

Railway uses `railway.json`:
- **Build Command**: Install deps, collect static, migrate
- **Start Command**: Run gunicorn server
- **Restart Policy**: Auto-restart on failure

## 📊 Monitoring

### View Logs

1. Click on your service
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. View real-time logs

### Metrics

Railway shows:
- CPU usage
- Memory usage
- Network traffic
- Request count

## 🐛 Troubleshooting

### Build Fails

**Check**:
- All files committed to GitHub
- `requirements.txt` is correct
- Python version in `runtime.txt` is supported

**Solution**:
```bash
git add .
git commit -m "Fix build"
git push origin main
```

### Database Connection Error

**Check**:
- PostgreSQL service is running
- `DATABASE_URL` is set
- Migrations ran successfully

**Solution**:
- Redeploy to run migrations again
- Check logs for specific error

### Static Files Not Loading

**Check**:
- `collectstatic` ran in build
- `STATIC_ROOT` is set correctly
- WhiteNoise is installed

**Solution**:
Add to `railway.json` build command:
```json
"buildCommand": "pip install -r requirements.txt && python manage.py collectstatic --noinput"
```

### App Crashes

**Check logs** for:
- Missing environment variables
- Import errors
- Database connection issues

**Common fixes**:
- Add missing environment variables
- Check `ALLOWED_HOSTS` includes Railway domain
- Verify database is connected

## 💰 Pricing

### Free Tier
- **$5 credit** per month
- Enough for small projects
- Includes PostgreSQL database
- No credit card required initially

### Paid Plans
- **Hobby**: $5/month
- **Pro**: $20/month
- More resources and features

## 🎯 Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] Can login to admin
- [ ] Can create posts
- [ ] Images upload to Cloudinary
- [ ] Database is working
- [ ] Static files load correctly
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up

## 🚀 Next Steps

1. ✅ Test all features
2. ✅ Create some test posts
3. ✅ Configure custom domain
4. ✅ Set up monitoring
5. ✅ Share your site!

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Django Docs**: https://docs.djangoproject.com

## 🎉 Success!

Your Django blog is now live on Railway!

Visit your site and start creating content! 🚂

---

**Questions?** Check the Railway documentation or deployment logs for details.
