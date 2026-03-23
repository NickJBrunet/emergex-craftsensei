from ninja.security import HttpBearer
from rest_framework_simplejwt.tokens import AccessToken, Token
from django.contrib.auth import get_user_model

User = get_user_model()

# Overwrites pre-existing JWTAuth for slightly custom auth rules
# where token must relate to signed-up user
class JWTAuth(HttpBearer):
    def authenticate(self, request, token=None):
        token = request.COOKIES.get("access_token")

        if not token:
            return None

        try:
            validated = AccessToken(token)
            user = User.objects.get(id=validated["user_id"])
            return user
        except Exception:
            return None