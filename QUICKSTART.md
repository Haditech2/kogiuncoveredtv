# Quick Start Guide

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables (copy `.env.example` to `.env` and fill in values):
```bash
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-database-url
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create a superuser (admin account):
```bash
python manage.py createsuperuser
```

5. Collect static files:
```bash
python manage.py collectstatic --noinput
```

6. Run the development server:
```bash
python manage.py runserver
```

## Access Your Site

- **Homepage**: http://localhost:8000/
- **Login**: http://localhost:8000/login/
- **Admin Dashboard**: http://localhost:8000/dashboard/ (after login)

## First Steps

1. Go to http://localhost:8000/login/
2. Log in with your superuser credentials
3. You'll be redirected to the dashboard
4. Click "Create New Post" to add your first article
5. Fill in the form and click "Publish Post"
6. Your post will appear on the homepage and articles page

## Features

- ✅ Custom admin dashboard (no Django admin needed)
- ✅ Custom rich text editor with Quill.js (secure, modern)
- ✅ Image upload with Cloudinary
- ✅ Tag management
- ✅ Draft/Published status
- ✅ Comments and likes
- ✅ Search functionality
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-friendly URLs (slugs)

## Troubleshooting

### Can't log in?
Make sure you created a superuser with `python manage.py createsuperuser`

### Images not uploading?
Check your Cloudinary credentials in `.env`

### Database errors?
Run `python manage.py migrate` to apply migrations

### Static files not loading?
Run `python manage.py collectstatic --noinput`
