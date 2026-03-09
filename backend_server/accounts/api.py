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

    return get_tokens_for_user(user)


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

    return get_tokens_for_user(user)