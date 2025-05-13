export default function DocumentViewPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Document Viewer</h1>
      <iframe
        src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        className="w-full max-w-3xl h-[600px] border rounded"
        title="PDF Preview"
      />
    </div>
  );
}
