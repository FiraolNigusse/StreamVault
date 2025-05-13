import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile); 
    setFile(selectedFile);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded shadow space-y-4">
      <input
        type="file"
        className="border p-2 w-full"
        onChange={handleFileChange}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
    </div>
  );
}
