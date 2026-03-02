from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.decorators.cache import cache_page


def ads_txt(request):
    """Serve ads.txt file"""
    content = "google.com, pub-4211041071990839, DIRECT, f08c47fec0942fa0"
    return HttpResponse(content, content_type='text/plain')


urlpatterns = [
    path('ads.txt', ads_txt, name='ads_txt'),
    path('', include('blog.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
