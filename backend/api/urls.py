from django.urls import path
from . import views

urlpatterns = [
    path("files-upload/", views.FileUploadView.as_view(), name="file-upload"),
    path("files/", views.FileListView.as_view(), name="files"),
    path("files/delete/<int:pk>/", views.FileDelete.as_view(), name="delete-file"),
    path("files/<int:pk>/share/", views.ShareFileView2.as_view(), name="share-file"),
    path("files/shared/", views.GetUserSharedFilesView.as_view(), name="files-shared"),
]
