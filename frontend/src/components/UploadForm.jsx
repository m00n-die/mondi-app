/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import axios from 'axios';
import api from '../api';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setSelectedFile(event.target.files[0]);
    setUploadMessage('');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('filename', selectedFile.name);
  
        const response = await api.post('/api/files-upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setSelectedFile(null);
        setUploadMessage('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file. Please try again.');
      }
    } else {
      setUploadMessage('Please select a file to upload.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload File</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </form>
  );
}

export default FileUpload;