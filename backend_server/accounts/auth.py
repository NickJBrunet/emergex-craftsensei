from ninja.security import HttpBearer
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            validated = AccessToken(token)
            user = User.objects.get(pk=validated["user_id"])

            request.user = user
            return user

        except Exception as e:
            print(f"JWT ERROR: {e}")
            return None
        

        