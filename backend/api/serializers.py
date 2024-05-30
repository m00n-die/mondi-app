from rest_framework import serializers
from .models import File, CustomUser, SharedFile
from django.core.exceptions import ValidationError


class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer for the CustomUser Model"""

    password = serializers.CharField(write_only=True)

    class Meta:
        """Meta class for CustomUserSerializer"""

        model = CustomUser
        fields = [
            "username",
            "email",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data) -> CustomUser:
        """Method to create a new CutomUser object"""
        # print(validated_data)
        user = CustomUser.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


def validate_file_size(value):
    limit_in_mb = 10  # Set your desired size limit in megabytes
    if value.size > limit_in_mb * 1024 * 1024:
        raise ValidationError(
            "File size must be less than or equal to {}MB".format(limit_in_mb)
        )


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(validators=[validate_file_size])

    class Meta:
        model = File
        fields = ("id", "filename", "file", "uploaded_date", "shared_with")

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class SharedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedFile
        fields = "__all__"
