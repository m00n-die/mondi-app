from django.http import FileResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import CustomUser, File
from .serializers import CustomUserSerializer, FileSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from django.db.models.manager import BaseManager
from rest_framework.parsers import MultiPartParser, FormParser


class FileListCreate(generics.ListCreateAPIView):
    """View for adding files and listing existing files"""

    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> BaseManager[File]:
        user = self.request.user
        return File.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class FileUploadView(APIView):
    """View for upload of files to server. Only allows authenticated users"""

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = FileSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "File uploaded successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileListView(APIView):
    """View to list files uploaded by a specific user"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_files = File.objects.filter(user=request.user)
        serializer = FileSerializer(user_files, many=True)
        return Response(serializer.data)


class FileDelete(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> BaseManager[File]:
        user = self.request.user
        return File.objects.filter(owner=user)


class ShareFileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, file_id) -> Response:
        try:
            file_to_share = File.objects.get(pk=file_id)
            if file_to_share.user != request.user:
                return Response(
                    {"error": "You can only share files you upload."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            username = request.data.get("username")
            try:
                shared_user = User.objects.get(username=username)
                file_to_share.shared_with.add(shared_user)
                return Response({"message": "File shared successfully."})
            except User.DoesNotExist:
                return Response(
                    {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except File.DoesNotExist:
            return Response(
                {"error": "File not found."}, status=status.HTTP_404_NOT_FOUND
            )


class DownloadFileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, file_id):
        try:
            file_to_download = File.objects.get(pk=file_id)
            if (
                request.user == file_to_download.user
                or file_to_download.shared_with.filter(pk=request.user.pk).exists()
            ):
                response = FileResponse(
                    file_to_download.file.read(),
                    content_type=file_to_download.file.content_type,
                )
                response["Content-Disposition"] = (
                    f'attachment; filename="{file_to_download.filename}"'
                )
                return response
            else:
                return Response(
                    {"error": "You are not authorized to download this file."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except File.DoesNotExist:
            return Response(
                {"error": "File not found."}, status=status.HTTP_404_NOT_FOUND
            )


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
