import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kogiuncovered.settings')
django.setup()

from django.contrib.auth.models import User

# Change admin password
try:
    admin = User.objects.get(username='admin')
    admin.set_password('Enjema2@')
    admin.save()
    print("Password changed successfully!")
    print("\n" + "="*50)
    print("NEW LOGIN CREDENTIALS")
    print("="*50)
    print("Username: admin")
    print("Password: Enjema2@")
    print("="*50)
except User.DoesNotExist:
    print("Admin user not found!")
