from ninja.security import APIKeyCookie
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuth:
    def authenticate(self, request, key):
        try:
            validated = AccessToken(key)
            user = User.objects.get(id=int(validated["user_id"]))

            request.user = user  # ✅ IMPORTANT
            return user

        except Exception as e:
            print("JWT ERROR:", e)
            return None