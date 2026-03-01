# 🚀 Start Here - Kogiuncovered TV Django Blog

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Migrations
```bash
python manage.py migrate
```

### 3. Create Admin Account
```bash
python create_admin.py
```

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

### 4. Start Server
```bash
python manage.py runserver
```

### 5. Access Your Site
- **Homepage**: http://localhost:8000/
- **Login**: http://localhost:8000/login/
- **Dashboard**: http://localhost:8000/dashboard/

## ✨ What's New

### Custom Admin Dashboard
- ✅ Removed Django admin (fixes Python 3.14 compatibility)
- ✅ Custom dashboard at `/dashboard/`
- ✅ Clean, modern interface
- ✅ Integrated with main site

### Secure Rich Text Editor
- ✅ Replaced insecure CKEditor 4.22.1
- ✅ Custom editor using Quill.js 1.3.7
- ✅ Modern, secure, actively maintained
- ✅ Better performance and mobile support

## 📚 Documentation

| Document | Description |
|----------|-------------|
| `LOGIN_DETAILS.md` | Admin login credentials and access info |
| `QUICKSTART.md` | Detailed setup and usage guide |
| `CUSTOM_ADMIN_SETUP.md` | How the custom admin works |
| `CUSTOM_EDITOR.md` | Rich text editor documentation |
| `SECURITY_UPGRADE.md` | CKEditor replacement details |

## 🎯 Common Tasks

### Create a New Post
1. Login at http://localhost:8000/login/
2. Go to Dashboard
3. Click "Create New Post"
4. Fill in the form:
   - Upload featured image (optional)
   - Enter title
   - Write excerpt (150-160 chars)
   - Add tags (comma-separated)
   - Write content with rich text editor
   - Check "Publish immediately" or save as draft
5. Click "Publish Post"

### Edit a Post
1. Go to Dashboard
2. Click the edit icon (pencil) next to any post
3. Make changes
4. Click "Update Post"

### Delete a Post
1. Go to Dashboard
2. Click the delete icon (trash) next to any post
3. Confirm deletion

## 🔧 Configuration

### Environment Variables (.env)
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database
- Default: SQLite (db.sqlite3)
- Production: PostgreSQL (via DATABASE_URL)

### Media Storage
- Images: Cloudinary
- Static files: WhiteNoise

## 🛠️ Development

### Run Tests
```bash
python manage.py test
```

### Check for Issues
```bash
python manage.py check
```

### Create Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Collect Static Files
```bash
python manage.py collectstatic --noinput
```

## 🚀 Deployment

### Prepare for Production
1. Set `DEBUG=False` in `.env`
2. Update `SECRET_KEY` to a secure random string
3. Configure `ALLOWED_HOSTS`
4. Set up PostgreSQL database
5. Configure Cloudinary
6. Run migrations
7. Collect static files

### Deploy to Vercel/Railway/Heroku
See deployment guides in:
- `DEPLOY_BACKEND.md`
- `README_DEPLOY.md`

## 🔐 Security

### Change Default Password
After first login, create a new admin user:
```bash
python manage.py createsuperuser
```

### Production Checklist
- [ ] DEBUG=False
- [ ] Strong SECRET_KEY
- [ ] HTTPS enabled
- [ ] Proper ALLOWED_HOSTS
- [ ] Database backups configured
- [ ] Cloudinary credentials secured
- [ ] Regular security updates

## 📱 Features

### For Visitors
- Browse articles
- Search posts
- Read content
- Like posts
- Leave comments
- Responsive design

### For Admins
- Custom dashboard
- Create/edit/delete posts
- Rich text editor
- Image uploads
- Tag management
- Draft/publish control
- View analytics

## 🐛 Troubleshooting

### Can't Login?
```bash
python create_admin.py
```

### Database Errors?
```bash
python manage.py migrate
```

### Static Files Not Loading?
```bash
python manage.py collectstatic --noinput
```

### Editor Not Working?
- Check browser console for errors
- Verify internet connection (Quill.js loads from CDN)
- Clear browser cache

### Images Not Uploading?
- Check Cloudinary credentials in `.env`
- Verify API keys are correct
- Check Cloudinary dashboard for quota

## 📞 Support

### Documentation
- Django: https://docs.djangoproject.com/
- Quill.js: https://quilljs.com/docs/
- Cloudinary: https://cloudinary.com/documentation

### Project Files
- Models: `blog/models.py`
- Views: `blog/views.py`
- Forms: `blog/forms.py`
- Templates: `blog/templates/`
- Settings: `kogiuncovered/settings.py`

## 🎉 You're Ready!

Your blog is set up and ready to use. Start by:

1. **Login**: http://localhost:8000/login/
2. **Create your first post**: Click "Create New Post"
3. **Customize**: Edit templates and styles as needed
4. **Deploy**: When ready, deploy to production

---

**Need help?** Check the documentation files or review the code comments.

**Found a bug?** Check the troubleshooting section above.

**Ready to deploy?** See the deployment guides.

Happy blogging! 🎊
