import requests

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from accounts.api import get_tokens_for_user
from backend_server.settings import LOGIN_REDIRECT_URL, LOGOUT_REDIRECT_URL

API_BASE = "http://127.0.0.1:8000/api"

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
    access_token = request.session.get("access_token")

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(f"{API_BASE}/servers/", headers=headers)

    try:
        if response.status_code == 200:
            server = response.json()[0]
            return render(request, "server_panel.html", {"server": server})
    except Exception:
        print(Exception)

    return render(request, "create_server.html")

@login_required
def create_server(request):
    if request.method == "POST":
        access_token = request.session.get("access_token")
        name = request.POST.get("name")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        requests.post(
            API_BASE + "/servers/",
            headers=headers,
            json={"name": name}
        )

    return redirect("/dashboard/")

@login_required
def rotate_key(request):
    # if request.method == "POST":
    #
    #     access_token = request.session.get("access_token")
    #     name = request.POST.get("name")
    #
    #     headers = {
    #         "Authorization": f"Bearer {access_token}",
    #         "Content-Type": "application/json"
    #     }
    #
    #     response = requests.get(f"{API_BASE}/servers/", headers=headers)
    #     server = response.json() if not response.json()[0] else response.json()[0]
    #
    #     try:
    #         if response.status_code == 200:
    #             requests.post(
    #                 API_BASE + "/servers/" + server.id + "/rotate-key",
    #                 headers=headers,
    #                 json={"name": name}
    #             )
    #     except Exception as e:
    #         print(e)

    return redirect("/dashboard/")


@login_required
def logout_view(request):
    logout(request)
    request.session.flush()
    return redirect(LOGOUT_REDIRECT_URL)