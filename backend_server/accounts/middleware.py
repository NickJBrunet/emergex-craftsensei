from django.shortcuts import redirect
from django.conf import settings


class LoginRequiredMiddleware:
    """
    Redirect all unauthenticated users to login page
    except allowed public paths.
    """

    PUBLIC_PATHS = [
        "/auth/login/",
        "/admin/login/"
    ]

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated:
            path = request.path
            if not any(path.startswith(p) for p in self.PUBLIC_PATHS):
                return redirect(settings.LOGIN_URL)

        return self.get_response(request)