from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    """Form that enables creation of new CustomUsers"""

    class Meta(UserCreationForm):
        model = CustomUser
        fields = (
            "username",
            "email",
            "password",
        )


class CustomUserChangeForm(UserChangeForm):
    """
    Form that enables editing and updation of already registered
    CustomUsers
    """

    class Meta:
        model = CustomUser
        fields = (
            "username",
            "email",
            "password",
        )
