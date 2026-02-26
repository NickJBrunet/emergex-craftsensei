from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from accounts.api import get_tokens_for_user
from backend_server.settings import LOGIN_REDIRECT_URL, LOGOUT_REDIRECT_URL


def login_page(request):
    if request.user.is_authenticated:
        return redirect(LOGIN_REDIRECT_URL)

    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            user = authenticate(request, email=email, password=password)
            if user:

                # 1. Create Django session (for web)
                login(request, user)

                # 2. Optionally generate JWT (for API usage)
                tokens = get_tokens_for_user(user)

                # Store access token in session (optional but useful)
                request.session["access_token"] = tokens["access"]

                return redirect(LOGIN_REDIRECT_URL)
            else:
                raise Exception("Invalid credentials")
        except Exception:
            return render(request, "login.html", {"error": "Invalid credentials"})

    return render(request, "login.html")

@login_required
def dashboard(request):
    """
    Authenticated-only page.
    Automatically redirects to LOGIN_URL if not logged in.
    """
    return render(request, "dashboard.html")


@login_required
def logout_view(request):
    logout(request)
    request.session.flush()
    return redirect(LOGOUT_REDIRECT_URL)