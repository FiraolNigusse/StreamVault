export default function VideoPreviewPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Video Preview</h1>
      <video controls className="w-full max-w-3xl mx-auto rounded">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
