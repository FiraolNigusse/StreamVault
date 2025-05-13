import { useState } from 'react';

export default function VideoPlayer({ videoUrl }) {
  const [error, setError] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {error ? (
        <div className="text-red-600">Failed to load video.</div>
      ) : (
        <video
          controls
          className="w-full rounded"
          onError={() => setError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
