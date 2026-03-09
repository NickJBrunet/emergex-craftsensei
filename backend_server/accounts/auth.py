from ninja.security import HttpBearer
from rest_framework_simplejwt.tokens import AccessToken, Token
from django.contrib.auth import get_user_model

User = get_user_model()

# Overwrites pre-existing JWTAuth for slightly custom auth rules
# where token must relate to signed-up user
class JWTAuth(HttpBearer):
    def authenticate(self, request, token: Token):
        try:
            access = AccessToken(token)
            user_id = access["user_id"]
            user = User.objects.get(id=user_id)
            request.user = user
            return user
        except Exception:
            return None