from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UploadedFile

from .models import UploadedFile
from .serializers import UploadedFileSerializer


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file_obj = request.FILES.get('file')
        user_id = request.data.get('user_id') 

        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_id:
            return Response({'error': 'No user_id provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Save file locally (automatically handled by FileField)
            uploaded_file = UploadedFile.objects.create(
                name=file_obj.name,
                file=file_obj,
                user_id=user_id 
            )
            serializer = UploadedFileSerializer(uploaded_file)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FileListView(APIView):
    def get(self, request):
        files = UploadedFile.objects.all().order_by('-uploaded_at')
        serializer = UploadedFileSerializer(files, many=True)
        return Response(serializer.data)
    
@api_view(['DELETE'])
def delete_file(request, file_id):
    try:
        file = UploadedFile.objects.get(id=file_id)
        file.file.delete(save=False)  # This deletes the file from storage
        file.delete()  # This deletes the record from the database
        return Response({"message": "File deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except UploadedFile.DoesNotExist:
        return Response({"error": "File not found."}, status=status.HTTP_404_NOT_FOUND)
