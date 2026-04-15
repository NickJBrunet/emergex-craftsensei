from django.http import JsonResponse
from ninja import Router
from django.contrib.auth import authenticate, get_user_model
from ninja.errors import HttpError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from backend_server.settings import DEBUG
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

    if not user:
        raise HttpError(401, "Not authenticated")

    return JsonResponse({
        "id": user.id,
        "email": user.email,
    })


@router.post("/refresh")
def refresh_token(request):
    token = request.COOKIES.get("refresh_token")

    if not token:
        raise HttpError(401, "No refresh token")

    try:
        refresh = RefreshToken(token)
        user = User.objects.get(id=refresh["user_id"])
    except (TokenError, User.DoesNotExist):
        raise HttpError(401, "Refresh token invalid or expired")

    tokens = get_tokens_for_user(user)

    return JsonResponse({
        "access": tokens["access"]
    })


@router.post("/register")
def register(request, data: RegisterIn):
    if User.objects.filter(email=data.email).exists():
        raise HttpError(403, "Email already registered")

    user = User.objects.create_user(
        email=data.email,
        password=data.password
    )

    tokens = get_tokens_for_user(user)

    response = JsonResponse({
        "access": tokens["access"]
    })

    response.set_cookie(
        key="refresh_token",
        value=tokens["refresh"],
        httponly=True,
        secure=not DEBUG,
        samesite="None" if not DEBUG else "Lax",
        path="/"
    )

    return response


@router.post("/login")
def login(request, data: LoginIn):
    user = authenticate(
        request,
        email=data.email,
        password=data.password,
    )

    if user is None:
        raise HttpError(403, "Invalid email or password")

    tokens = get_tokens_for_user(user)

    response = JsonResponse({
        "access": tokens["access"]
    })

    response.set_cookie(
        key="refresh_token",
        value=tokens["refresh"],
        httponly=True,
        secure=not DEBUG,
        samesite="None" if not DEBUG else "Lax",
        path="/"
    )

    return response


@router.post("/logout", auth=JWTAuth())
def logout(request):
    user = request.auth

    if not user:
        raise HttpError(401, "Not authenticated")

    response = JsonResponse({"success": True})

    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    return response