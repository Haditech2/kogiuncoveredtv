# Deploy Backend to Vercel - Quick Guide

## Step-by-Step Instructions

### 1. Open Vercel
Go to: https://vercel.com/new

### 2. Import Repository
- Click "Import Git Repository"
- Select: `Haditech2/kogiuncoveredtv`
- Click "Import"

### 3. Configure Project
Set these values:
- **Project Name**: `kogiuncoveredtv-api`
- **Framework Preset**: Other
- **Root Directory**: Click "Edit" → Type `backend` → Continue
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)

### 4. Add Environment Variables
Click "Add" for each variable:

```
DATABASE_URL
<your-neon-postgres-connection-string>

CLOUDINARY_CLOUD_NAME
<your-cloudinary-cloud-name>

CLOUDINARY_API_KEY
<your-cloudinary-api-key>

CLOUDINARY_API_SECRET
<your-cloudinary-api-secret>

SECRET_KEY
<your-secret-key>
```

**Note:** Get your actual values from:
- Neon Dashboard for DATABASE_URL
- Cloudinary Dashboard for Cloudinary credentials
- Generate a random string for SECRET_KEY

### 5. Deploy
Click "Deploy" button and wait 1-2 minutes

### 6. Copy Your Backend URL
After deployment, you'll see a URL like:
`https://kogiuncoveredtv-api.vercel.app`

**COPY THIS URL!**

### 7. Update Frontend
1. Go to: https://vercel.com/dashboard
2. Find project: `kogiuncovered.online`
3. Click Settings → Environment Variables
4. Add new variable:
   - Name: `VITE_API_URL`
   - Value: `https://kogiuncoveredtv-api.vercel.app/api` (your backend URL + /api)
5. Save
6. Go to Deployments tab
7. Click ⋯ on latest deployment → "Redeploy"

### 8. Test
Visit: https://kogiuncovered.online
Your site should now work with the backend!

### 9. Create Your First Post
1. Login as admin at: https://kogiuncovered.online/login
2. Go to: https://kogiuncovered.online/create-post
3. Create a post
4. It will now be visible to everyone!

---

## Troubleshooting

**If you get errors:**
1. Check backend logs in Vercel dashboard
2. Make sure all environment variables are set correctly
3. Test backend API: `https://your-backend-url.vercel.app/api/posts`
   - Should return JSON (empty array [] is OK)

**Need help?** Check the deployment logs in Vercel dashboard.
