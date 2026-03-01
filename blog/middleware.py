from .models import PageView


class PageViewMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Track page views for successful GET requests
        # Exclude admin/staff users and admin pages
        if (request.method == 'GET' and 
            response.status_code == 200 and 
            not request.user.is_authenticated and
            not request.path.startswith('/dashboard/')):
            
            # Get client IP
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR', '0.0.0.0')
            
            # Create page view record
            PageView.objects.create(
                page_url=request.path,
                user_ip=ip,
                user_agent=request.META.get('HTTP_USER_AGENT', '')[:500],
                referrer=request.META.get('HTTP_REFERER', '')[:500]
            )
        
        return response
