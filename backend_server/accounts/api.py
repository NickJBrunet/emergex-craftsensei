from rest_framework_simplejwt.tokens import RefreshToken

# Creates/gets token for user
def get_tokens_for_user(user):

    # Get token
    refresh = RefreshToken.for_user(user)

    # Add custom claims
    refresh["email"] = user.email
    refresh["role"] = user.role

    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }