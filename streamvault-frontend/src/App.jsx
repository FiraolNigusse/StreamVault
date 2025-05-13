import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import VideoPreviewPage from './pages/VideoPreviewPage';
import DocumentViewPage from './pages/DocumentViewPage';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">StreamVault</h1>
      <p>Navigate:</p>
      <div className="space-x-4 mt-4">
        <Link className="text-blue-500 underline" to="/upload">Upload</Link>
        <Link className="text-blue-500 underline" to="/video-preview">Video Preview</Link>
        <Link className="text-blue-500 underline" to="/document/1">Document View</Link>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/video/:id" element={<VideoPreviewPage />} />
        <Route path="/document-preview/:id" element={<DocumentViewPage />} />
        <Route path="/video-preview" element={<VideoPreviewPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
