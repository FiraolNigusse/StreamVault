import { useState } from 'react';
import { getAuth } from "firebase/auth";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const user = getAuth().currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user.uid);

    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload successful:", data);
      alert("File uploaded!");
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded shadow space-y-4">
      <input
        type="file"
        className="border p-2 w-full"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}
