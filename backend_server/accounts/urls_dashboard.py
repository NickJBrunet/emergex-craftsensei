from django.urls import path
from .views import dashboard, create_server, rotate_key

urlpatterns = [
    path("", dashboard, name="dashboard"),
    path("create-server/", create_server, name="create_server"),
    path("rotate-key/", rotate_key, name="rotate_key"),
]