from django.urls import path
from . import views

urlpatterns = [
    path("files-upload/", views.FileUploadView.as_view(), name="file-upload"),
    path("files/delete/<int:pk>/", views.FileDelete.as_view(), name="delete-file"),
    path("files/<int:pk>/share/", views.ShareFileView.as_view(), name="share-file"),
]
