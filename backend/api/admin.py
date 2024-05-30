from django.contrib import admin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, File
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(File)


class CustomUserAdmin(UserAdmin):
    """Class that defines the CustomUser Admin properties"""

    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        "username",
        "email",
        "is_staff",
    ]

    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("name",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("name",)}),)


admin.site.register(CustomUser, CustomUserAdmin)
