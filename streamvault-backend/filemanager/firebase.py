import uuid
from firebase_admin import storage

def upload_file_to_firebase(file):
    bucket = storage.bucket()
    blob = bucket.blob(f'uploads/{uuid.uuid4()}_{file.name}')
    blob.upload_from_file(file, content_type=file.content_type)
    blob.make_public()
    return blob.public_url
