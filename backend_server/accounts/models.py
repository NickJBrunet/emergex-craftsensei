from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):

    # Creates a default user
    def create_user(self, email, password=None, role="user"):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, role=role)
        user.set_password(password)  # Secure hashing
        user.save(using=self._db)
        return user

    # Creates an admin user
    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password, role="admin")
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    # Different types of roles
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("user", "User"),
    )

    # User class attributes/db fields
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="user")

    # Django Specific attributes
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # User manager reference from static User object
    objects = UserManager()

    # Django user model relation to db
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} ({self.role})"