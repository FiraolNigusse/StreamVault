import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function UserFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "files"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFiles(fetched);
    };

    fetchFiles();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Your Uploaded Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id} className="mb-2">
            <strong>{file.filename}</strong> ({file.type}) -{" "}
            <a href={file.downloadURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
