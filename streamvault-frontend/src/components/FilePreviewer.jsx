import React from "react";
import DocumentViewer from "./DocumentViewer";

const FilePreviewer = ({ fileUrl, fileName }) => {
  const extension = fileName.split(".").pop().toLowerCase();

  // Video preview
  if (["mp4", "webm"].includes(extension)) {
    return (
        <div className="mt-4">
          <video controls className="w-full max-w-xl h-[300px] rounded border">
            <source src={fileUrl} type={`video/${extension}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
  }

  // Image preview
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(extension)) {
    return <img src={fileUrl} alt={fileName} className="w-full max-w-xl h-[300px] rounded border mt-4" />;
  }

  // PDF preview
  if (extension === "pdf") {
    return <DocumentViewer url={fileUrl} />;
  }

  // DOCX, PPTX, XLSX via Google Docs Viewer
  if (["docx", "doc", "pptx", "ppt", "xlsx", "xls"].includes(extension)) {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;

    return (
      <iframe
        src={viewerUrl}
        className="w-full max-w-3xl h-[600px] border rounded mt-4"
        title="Google Docs Viewer"
      />
    );
  }

  // Fallback for unsupported files
  return (
    <p className="text-gray-600 mt-4">
      Preview not supported.{" "}
      <a
        href={fileUrl}
        className="underline text-blue-600"
        target="_blank"
        rel="noreferrer"
      >
        Download
      </a>
    </p>
  );
};

export default FilePreviewer;
