# Login Details for Kogiuncovered TV Admin

## Admin Account Credentials

```
Username: admin
Password: admin123
```

## Access URLs

- **Login Page**: http://localhost:8000/login/
- **Admin Dashboard**: http://localhost:8000/dashboard/
- **Create Post**: http://localhost:8000/create-post/
- **Homepage**: http://localhost:8000/

## How to Login

1. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

2. Open your browser and go to: http://localhost:8000/login/

3. Enter the credentials:
   - Username: `admin`
   - Password: `admin123`

4. Click "Sign in"

5. You'll be automatically redirected to the Admin Dashboard

## What You Can Do After Login

### Admin Dashboard (`/dashboard/`)
- View all posts in a table format
- See post status (Published/Draft)
- Quick actions: View, Edit, Delete
- Create new posts

### Create Post (`/create-post/`)
- Upload featured image
- Write title and excerpt
- Add tags (comma-separated)
- Write content with rich text editor
- Set publish status
- Save as draft or publish immediately

### Edit Post (`/edit-post/<slug>/`)
- Modify existing posts
- Update images, content, tags
- Change publish status

### Navigation Features
- Dashboard link appears in navigation when logged in
- Your username is displayed in the header
- Logout button available

## Security Notes

⚠️ **IMPORTANT**: Change the default password after first login!

To change password:
1. You can create a new admin user with a different password
2. Or use Django's password change functionality

## Creating Additional Admin Users

Run this command to create more admin users:
```bash
python manage.py createsuperuser
```

Follow the prompts to set username, email, and password.

## Troubleshooting

### Can't login?
- Make sure the server is running: `python manage.py runserver`
- Check you're using the correct URL: http://localhost:8000/login/
- Verify credentials are correct (case-sensitive)

### "Permission denied" errors?
- Make sure your user has `is_staff=True` status
- Run `python create_admin.py` to update user permissions

### Forgot password?
- Run `python create_admin.py` to reset to default password
- Or create a new superuser with `python manage.py createsuperuser`

## Production Deployment

When deploying to production:

1. **Change the default password immediately**
2. Use strong passwords (mix of letters, numbers, symbols)
3. Set `DEBUG=False` in `.env`
4. Update `SECRET_KEY` to a secure random string
5. Configure proper `ALLOWED_HOSTS`
6. Use HTTPS for all admin access

## Quick Reference

| Action | URL | Requires Login |
|--------|-----|----------------|
| Homepage | `/` | No |
| Articles | `/articles/` | No |
| Login | `/login/` | No |
| Dashboard | `/dashboard/` | Yes (Staff) |
| Create Post | `/create-post/` | Yes (Staff) |
| Edit Post | `/edit-post/<slug>/` | Yes (Staff) |
| Delete Post | `/delete-post/<slug>/` | Yes (Staff) |

---

**Need help?** Check `QUICKSTART.md` and `CUSTOM_ADMIN_SETUP.md` for more information.
