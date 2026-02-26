# Deploy Flask Backend to Vercel

## Steps to Deploy:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/new

### 2. Import Your Repository
- Click "Import Project"
- Select your GitHub repository: `Haditech2/kogiuncoveredtv`
- Click "Import"

### 3. Configure the Project
- **Project Name**: `kogiuncoveredtv-backend` (or any name you prefer)
- **Framework Preset**: Other
- **Root Directory**: Click "Edit" and set to `backend`
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: `pip install -r requirements.txt`

### 4. Add Environment Variables
Click "Environment Variables" and add:

```
CLOUDINARY_CLOUD_NAME=ded3xrpof
CLOUDINARY_API_KEY=724112677748272
CLOUDINARY_API_SECRET=DTIYizyqgyO9bNgvKNNRAeNvZEA
SECRET_KEY=kogiuncovered-secret-key-2024
DATABASE_URL=sqlite:///blog.db
```

**OR** Use Vercel's Cloudinary Integration:
- Go to Integrations tab
- Add Cloudinary integration
- It will auto-configure the environment variables

### 5. Deploy
Click "Deploy" and wait for deployment to complete.

### 6. Get Your Backend URL
After deployment, copy your backend URL (e.g., `https://kogiuncoveredtv-backend.vercel.app`)

### 7. Update Frontend Environment Variable
Go to your frontend project in Vercel:
- Settings → Environment Variables
- Add/Update: `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
- Redeploy the frontend

## Important Notes:

⚠️ **SQLite Limitation on Vercel:**
Vercel's serverless functions are stateless, so SQLite won't persist data between requests.

**Solutions:**
1. **Use Vercel Postgres** (Recommended - Free tier available)
   - Add Vercel Postgres integration
   - Update `DATABASE_URL` to the Postgres connection string

2. **Use Supabase** (Free tier available)
   - Create a Supabase project
   - Get the Postgres connection string
   - Update `DATABASE_URL`

3. **Use PlanetScale** (Free tier available)
   - Create a PlanetScale database
   - Get the connection string
   - Update `DATABASE_URL`

## Testing Your Deployment

After deployment, test your API:
```bash
curl https://your-backend-url.vercel.app/api/posts
```

You should see a JSON response with posts.
