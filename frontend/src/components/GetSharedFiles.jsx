import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileItem from './FileItem'; // Assuming FileItem component displays a file

function GetSharedFiles() {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedFiles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/users/shared-files/');
        setSharedFiles(response.data);
      } catch (error) {
        console.error('Error fetching shared files:', error);
        setError('Error fetching shared files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedFiles();
  }, []); // Empty dependency array for initial fetch on component mount

  return (
    <div>
      <h2>Shared Files</h2>
      {isLoading && <p>Loading shared files...</p>}
      {error && <p>{error}</p>}
      {sharedFiles.length > 0 && (
        <ul>
          {sharedFiles.map((file) => (
            <li key={file.id}>
              <FileItem file={file} />  {/* Pass the file data to FileItem component */}
            </li>
          ))}
        </ul>
      )}
      {sharedFiles.length === 0 && <p>No shared files yet.</p>}
    </div>
  );
}

export default GetSharedFiles;
