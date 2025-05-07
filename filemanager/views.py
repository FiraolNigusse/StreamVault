from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .firebase import upload_file_to_firebase
from .models import UploadedFile
from .serializers import UploadedFileSerializer

class FileUploadView(APIView):
    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        public_url = upload_file_to_firebase(file)
        uploaded_file = UploadedFile.objects.create(name=file.name, firebase_url=public_url)
        serializer = UploadedFileSerializer(uploaded_file)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FileListView(APIView):
    def get(self, request):
        files = UploadedFile.objects.all().order_by('-uploaded_at')
        serializer = UploadedFileSerializer(files, many=True)
        return Response(serializer.data)
