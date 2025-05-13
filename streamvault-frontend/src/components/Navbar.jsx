import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex space-x-4 p-4 bg-gray-100 shadow">
      <a href="/upload" className="hover:text-blue-600">Upload</a>
      <a href="/video-preview" className="hover:text-blue-600">Video Preview</a>
      <a href="/document-preview" className="hover:text-blue-600">Document Viewer</a>
      <a href="/login" className="hover:text-blue-600">Login</a>
      <a href="/signup" className="hover:text-blue-600">Sign Up</a>
    </nav>

  );
}
