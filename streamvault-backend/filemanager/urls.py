from django.urls import path
from .views import FileUploadView, FileListView
from . import views
urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='upload-file'),
    path('files/', FileListView.as_view(), name='list-files'),
    path('api/files/<int:file_id>/', views.delete_file, name='delete_file'),
]
