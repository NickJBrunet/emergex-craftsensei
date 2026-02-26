from django.shortcuts import redirect
from django.urls import path
from .views import login_page, dashboard, logout_view

urlpatterns = [
    path("", lambda request: redirect("/auth/login/")),
    path("login/", login_page, name="login"),
    path("logout/", logout_view, name="logout")
]