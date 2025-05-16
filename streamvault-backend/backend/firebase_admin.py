import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("path/to/your-serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'your-project-id.appspot.com'
})