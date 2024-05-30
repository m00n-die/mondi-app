import { useState, useEffect } from 'react';
import FileItem from './FileItem'; 
import api from '../api';

function GetSharedFiles() {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedFiles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/files/shared/');
        setSharedFiles(response.data.map((file) => ({ ...file, downloadUrl: null })));
      } catch (error) {
        console.error('Error fetching shared files:', error);
        setError('Error fetching shared files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedFiles();
  }, []);

  return (
    <div>
      <h2>Shared Files</h2>
      {isLoading && <p>Loading shared files...</p>}
      {error && <p>{error}</p>}
      {sharedFiles.length > 0 && (
        <ul>
          {sharedFiles.map((file) => (
            <li key={file.id}>
              <FileItem file={file} />
            </li>
          ))}
        </ul>
      )}
      {sharedFiles.length === 0 && <p>No shared files yet.</p>}
    </div>
  );
}

export default GetSharedFiles;
