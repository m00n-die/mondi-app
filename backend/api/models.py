from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class File(models.Model):
    """Class that represents the file model"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to="uploads/")
    uploaded_date = models.DateTimeField(auto_now_add=True)
    shared_with = models.ManyToManyField(User, related_name="shared_files", blank=True)

    def __str__(self) -> str:
        """String representation for the FILE class"""
        return self.filename
