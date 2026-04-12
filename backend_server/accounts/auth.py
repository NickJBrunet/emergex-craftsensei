from ninja.security import APIKeyCookie
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuth:
    def __call__(self, request):
        key = request.COOKIES.get("access_token")
        if not key:
            return None

        try:
            validated = AccessToken(key)
            return User.objects.get(id=int(validated["user_id"]))
        except Exception as e:
            return None