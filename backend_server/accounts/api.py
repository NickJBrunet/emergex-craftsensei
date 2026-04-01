from django.http import JsonResponse
from ninja import Router
from django.contrib.auth import authenticate, get_user_model
from ninja.errors import HttpError
from rest_framework_simplejwt.tokens import RefreshToken

from .auth import JWTAuth
from .schemas import RegisterIn, LoginIn, TokenOut

User = get_user_model()


router = Router()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


@router.get("/me", auth=JWTAuth())
def me(request):
    user = request.auth

    print("Hello?")

    if not user:
        raise HttpError(401, "Not authenticated")

    return {
        "id": user.id,
        "email": user.email,
    }

@router.post("/register", response=TokenOut)
def register(request, data: RegisterIn):
    """
    Create a new user with secure hashed password.
    Stored in PostgreSQL (accounts_user table).
    """
    if User.objects.filter(email=data.email).exists():
        raise HttpError(403, "Email already registered")

    user = User.objects.create_user(
        email=data.email,
        password=data.password  # hashed automatically
    )

    tokens = get_tokens_for_user(user)

    response = JsonResponse({"success": True})

    response.set_cookie(
        key="access_token",
        value=tokens["access"],
        httponly=True,
        secure=False,
        samesite="Lax",
    )

    return response


@router.post("/login", response=TokenOut)
def login(request, data: LoginIn):
    """
    Authenticate user using email + password.
    Returns JWT tokens.
    """
    user = authenticate(
        request,
        email=data.email,
        password=data.password,
    )

    if user is None:
        raise HttpError(403, "Invalid email or password")

    tokens = get_tokens_for_user(user)

    response = JsonResponse({"success": True})

    # 🔥 Access token (short-lived)
    response.set_cookie(
        key="access_token",
        value=tokens["access"],
        httponly=True,
        secure=False,   # True in production (HTTPS)
        samesite="Lax",
        path="/",
    )

    # 🔥 Refresh token (optional but recommended)
    response.set_cookie(
        key="refresh_token",
        value=tokens["refresh"],
        httponly=True,
        secure=False,
        samesite="Lax",
        path="/",
    )

    return response


@router.post("/logout")
def logout(request):
    response = JsonResponse({"success": True})

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return response