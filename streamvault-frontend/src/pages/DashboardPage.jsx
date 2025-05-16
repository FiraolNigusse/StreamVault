import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", "123"); // Replace with actual user ID logic

    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUploadedFiles((prev) => [...prev, data]); // `data` contains file name and maybe URL if Django provides it
      setFile(null);
      alert("✅ File uploaded successfully!");
    } catch (error) {
      alert("❌ Upload failed: " + error.message);
    }
  };

  // Optional: Fetch list of uploaded files from Django
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/files/");
        if (!response.ok) throw new Error("Failed to fetch files");
        const data = await response.json();
        setUploadedFiles(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Upload a File</h2>
        <input type="file" onChange={handleFileChange} className="block mb-2" />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Files</h2>
        {uploadedFiles.length === 0 && <p>No files uploaded yet.</p>}
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.id || file.name}>
              <a href={file.url || "/streamvault-frontend/src/components/DocumentViewer.jsx"} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
