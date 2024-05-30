from rest_framework import serializers
from .models import File, CustomUser


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


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ("id", "filename", "uploaded_date", "shared_with")

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
