# Kogiuncovered TV - Django Blog

A modern, secure blog platform built with Django, featuring a custom admin dashboard and rich text editor.

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create admin user
python create_admin.py

# Start server
python manage.py runserver
```

**Access:** http://localhost:8000/login/
**Login:** admin / admin123

## ✨ Features

- ✅ Custom admin dashboard (no Django admin)
- ✅ Secure rich text editor (Quill.js 1.3.7)
- ✅ Image uploads with Cloudinary
- ✅ Tag management
- ✅ Draft/publish workflow
- ✅ Comments and likes
- ✅ Search functionality
- ✅ SEO-friendly URLs
- ✅ Responsive design
- ✅ Python 3.14 compatible

## 📚 Documentation

| File | Description |
|------|-------------|
| [START_HERE.md](START_HERE.md) | Complete getting started guide |
| [LOGIN_DETAILS.md](LOGIN_DETAILS.md) | Admin credentials and access |
| [QUICKSTART.md](QUICKSTART.md) | Detailed setup instructions |
| [CUSTOM_ADMIN_SETUP.md](CUSTOM_ADMIN_SETUP.md) | Admin dashboard documentation |
| [CUSTOM_EDITOR.md](CUSTOM_EDITOR.md) | Rich text editor guide |
| [SECURITY_UPGRADE.md](SECURITY_UPGRADE.md) | Security improvements |

## 🔧 Configuration

### Environment Variables

Create a `.env` file (see `.env.example`):

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database

- **Development**: SQLite (default)
- **Production**: PostgreSQL (recommended)

### Media Storage

- **Images**: Cloudinary
- **Static files**: WhiteNoise

## 🎯 Usage

### Create a Post

1. Login at `/login/`
2. Go to Dashboard at `/dashboard/`
3. Click "Create New Post"
4. Fill in the form:
   - Upload featured image
   - Enter title and excerpt
   - Add tags (comma-separated)
   - Write content with rich text editor
   - Set publish status
5. Click "Publish Post"

### Edit a Post

1. Go to Dashboard
2. Click edit icon next to post
3. Make changes
4. Click "Update Post"

### Delete a Post

1. Go to Dashboard
2. Click delete icon next to post
3. Confirm deletion

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

1. Set `DEBUG=False`
2. Update `SECRET_KEY`
3. Configure `ALLOWED_HOSTS`
4. Set up PostgreSQL
5. Configure Cloudinary
6. Run migrations
7. Collect static files

### Deploy to Vercel/Railway/Heroku

See deployment documentation for platform-specific instructions.

## 📁 Project Structure

```
kogiuncovered-django/
├── blog/                      # Blog app
│   ├── migrations/           # Database migrations
│   ├── templates/            # Blog templates
│   ├── models.py            # Post, Comment, Like models
│   ├── views.py             # View functions
│   ├── forms.py             # PostForm with custom editor
│   ├── widgets.py           # QuillEditorWidget
│   └── urls.py              # Blog URLs
├── kogiuncovered/            # Project settings
│   ├── settings.py          # Django settings
│   ├── urls.py              # Main URL config
│   └── wsgi.py              # WSGI config
├── templates/                # Base templates
│   └── base.html            # Base template
├── static/                   # Static files
├── manage.py                 # Django management
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
└── README.md                 # This file
```

## 🔐 Security

### Features

- ✅ Secure rich text editor (Quill.js)
- ✅ CSRF protection
- ✅ XSS protection
- ✅ SQL injection protection
- ✅ Secure password hashing
- ✅ HTTPS support (production)

### Best Practices

- Change default admin password
- Use strong SECRET_KEY
- Enable HTTPS in production
- Keep dependencies updated
- Regular backups

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
- Check browser console
- Verify internet connection (CDN)
- Clear browser cache

## 📞 Support

- **Django Docs**: https://docs.djangoproject.com/
- **Quill.js Docs**: https://quilljs.com/docs/
- **Cloudinary Docs**: https://cloudinary.com/documentation

## 📝 License

This project is for Kogiuncovered TV.

## 🎉 Credits

- **Framework**: Django 5.1+
- **Editor**: Quill.js 1.3.7
- **Styling**: Tailwind CSS
- **Storage**: Cloudinary
- **Database**: PostgreSQL/SQLite

---

**Ready to start?** See [START_HERE.md](START_HERE.md) for detailed instructions!
