from ninja.security import APIKeyCookie
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuth(APIKeyCookie):
    param_name = "access_token"

    def authenticate(self, request, key):
        try:
            validated = AccessToken(key)

            print("==== TOKEN PAYLOAD ====")
            print(dict(validated))
            print("=======================")

            user = User.objects.get(id=validated["user_id"])
            return user
        except Exception as e:
            print("JWT ERROR:", e)
            return None