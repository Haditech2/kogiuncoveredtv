from django.contrib.auth import logout
from django.utils import timezone
from datetime import timedelta


class AdminSessionTimeoutMiddleware:
    """
    Middleware to automatically logout admin users after 5 minutes of inactivity.
    Regular visitors are not affected.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and request.user.is_staff:
            # Check last activity time
            last_activity = request.session.get('last_activity')
            
            if last_activity:
                # Convert to datetime
                last_activity_time = timezone.datetime.fromisoformat(last_activity)
                
                # Check if more than 5 minutes have passed
                if timezone.now() - last_activity_time > timedelta(minutes=5):
                    # Logout the user
                    logout(request)
                    # Redirect will be handled by @login_required decorator
            
            # Update last activity time
            request.session['last_activity'] = timezone.now().isoformat()
        
        response = self.get_response(request)
        return response
