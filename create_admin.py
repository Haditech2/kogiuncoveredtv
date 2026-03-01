import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kogiuncovered.settings')
django.setup()

from django.contrib.auth.models import User

# Admin credentials
username = 'admin'
email = 'admin@kogiuncovered.com'
password = 'admin123'

# Check if user already exists
if User.objects.filter(username=username).exists():
    print(f"User '{username}' already exists!")
    user = User.objects.get(username=username)
    # Update to ensure they're staff and superuser
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print(f"Updated '{username}' to staff/superuser status")
else:
    # Create new superuser
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser '{username}' created successfully!")

print("\n" + "="*50)
print("LOGIN CREDENTIALS")
print("="*50)
print(f"Username: {username}")
print(f"Password: {password}")
print(f"Login URL: http://localhost:8000/login/")
print("="*50)
