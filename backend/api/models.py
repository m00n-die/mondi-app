from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# Create your models here.
class CustomUser(AbstractUser):
    """Class representation of users of the web application"""

    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        """String representation of the class"""
        return self.name

    objects = UserManager()


class File(models.Model):
    """Class that represents the file model"""

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to="uploads/")
    uploaded_date = models.DateTimeField(auto_now_add=True)
    shared_with = models.ManyToManyField(
        CustomUser, related_name="shared_files", blank=True
    )

    def __str__(self) -> str:
        """String representation for the FILE class"""
        return self.filename


class SharedFile(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    recipient = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="files_shared"
    )
    created_at = models.DateTimeField(auto_now_add=True)
