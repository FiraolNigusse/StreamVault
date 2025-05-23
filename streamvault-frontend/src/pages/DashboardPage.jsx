import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import FilePreviewer from "../components/FilePreviewer";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { Upload, Eye, Trash2 } from "lucide-react";

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", "123");

    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setUploadedFiles((prev) => [data, ...prev]);
      setFile(null);
      inputRef.current.value = "";
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const handleDelete = async (fileId) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/files/${fileId}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const openPreviewModal = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const closePreviewModal = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const getFileType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
    if (["mp4", "webm", "mov"].includes(ext)) return "video";
    return ext.toUpperCase();
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/files/");
        const data = await response.json();
        setUploadedFiles(data);
      } catch (err) {
        console.error("Error fetching files", err);
      }
    };
    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <motion.h1
        className="text-3xl font-extrabold text-slate-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎉 Welcome to Your File Vault
      </motion.h1>

      {/* Upload Card */}
      <motion.div
        className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-indigo-800 mb-3 flex items-center gap-2">
          <Upload size={20} />
          Upload a File
        </h2>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="block text-sm mb-4 bg-white border border-indigo-300 rounded-md px-3 py-2"
        />
        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition-all duration-300"
        >
          Upload File
        </button>
      </motion.div>

      {/* Uploaded Files Grid */}
      <motion.div
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-5">📁 Your Files</h2>
        {uploadedFiles.length === 0 ? (
          <p className="text-slate-500 text-sm">No files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {uploadedFiles.map((file) => {
              const fileUrl = `http://localhost:8000${file.file}`;
              const fileType = getFileType(file.name);

              return (
                <motion.div
                  key={file.id}
                  className="bg-slate-50 rounded-lg p-4 shadow hover:shadow-lg border border-slate-200 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Thumbnail */}
                  {(fileType === "image" || fileType === "video") && (
                    <div className="mb-3">
                      {fileType === "image" && (
                        <img
                          src={fileUrl}
                          alt={file.name}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      )}
                      {fileType === "video" && (
                        <video
                          src={fileUrl}
                          controls
                          className="w-full h-40 object-cover rounded-md"
                        />
                      )}
                    </div>
                  )}

                  {/* File name and delete */}
                  <div className="flex items-center justify-between mb-2">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate w-5/6 text-indigo-700 hover:underline font-medium text-sm"
                    >
                      {file.name}
                    </a>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* File type badge */}
                  <span className="inline-block text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5 mb-2">
                    {fileType}
                  </span>

                  {/* Preview button */}
                  <div className="text-right mt-2">
                    <button
                      onClick={() => openPreviewModal(file)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 justify-end"
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Modal Preview */}
      <Modal isOpen={isModalOpen} onClose={closePreviewModal}>
        {selectedFile && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{selectedFile.name}</h3>
            <FilePreviewer
              fileUrl={`http://localhost:8000${selectedFile.file}`}
              fileName={selectedFile.name}
            />
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default DashboardPage;
