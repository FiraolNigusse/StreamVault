export default function DocumentViewer({ url }) {
  return (
    <iframe
      src={url}
      className="w-full max-w-3xl h-[600px] border rounded"
      title="Document Viewer"
    />
  );
}
