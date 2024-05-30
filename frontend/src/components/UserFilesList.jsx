/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../api';
import ShareFile from './ShareFile';

function UserFilesList({ userId }) { 
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  useEffect(() => {
    const fetchUserFiles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/files/`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching user files:', error);
        setError('Error fetching files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFiles();
  }, [userId]);

  const handleShareClick = (fileId) => {
    // Pass the file ID as a prop to the ShareFile component
    setIsSharing(true);
    setSelectedFileId(fileId);
  };

  return (
    <div>
      <h2>User Files</h2>
      {isLoading && <p>Loading files...</p>}
      {error && <p>{error}</p>}
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.filename}
              <button onClick={() => handleShareClick(file.id)}>Share</button>
            </li>
          ))}
        </ul>
      )}
      {isSharing && selectedFileId && (
        <ShareFile fileId={selectedFileId} onClose={() => setIsSharing(false)} />
      )}
      {files.length === 0 && <p>No files uploaded yet.</p>}
    </div>
  );
}

export default UserFilesList;