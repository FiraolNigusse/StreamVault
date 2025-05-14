// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="flex space-x-4 p-4 bg-gray-100 shadow">
      {user && (
        <>
          <Link to="/upload" className="hover:text-blue-600">Upload</Link>
          <Link to="/video-preview" className="hover:text-blue-600">Video Preview</Link>
          <Link to="/document-preview" className="hover:text-blue-600">Document Viewer</Link>
        </>
      )}

      {!user && (
        <>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/signup" className="hover:text-blue-600">Sign Up</Link>
        </>
      )}

      {user && (
        <button onClick={handleLogout} className="hover:text-red-600">
          Logout
        </button>
      )}
    </nav>
  );
}
