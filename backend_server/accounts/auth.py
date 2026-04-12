from ninja.security import APIKeyCookie
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuth(APIKeyCookie):
    param_name = "access_token"

    def authenticate(self, request, key):
        try:
            validated = AccessToken(key)

            user_id = validated.get("user_id")
            if not user_id:
                return None

            return User.objects.get(pk=user_id)

        except Exception as e:
            print("JWT ERROR:", e)
            return None