import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kogiuncovered.settings')

application = get_wsgi_application()

# Vercel requires the entrypoint to be named 'app'
app = application
