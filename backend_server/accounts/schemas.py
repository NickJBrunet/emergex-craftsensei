from ninja import Schema
from pydantic import EmailStr


class RegisterIn(Schema):
    email: EmailStr
    password: str


class LoginIn(Schema):
    email: EmailStr
    password: str


class TokenOut(Schema):
    access: str
    refresh: str