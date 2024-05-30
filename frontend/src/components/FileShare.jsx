/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import api from '../api';

function ShareFile({ file }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    setShareMessage('');
  };


  const handleShare = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id', selectedFile.id)
        formData.append ('shared_with', userName)
        const response = await api.post(`/api/files/${selectedFile.id}/share/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSelectedFile(null);
        setShareMessage('File shared successfully!');
      } catch (error) {
        console.error('Error sharing file:', error);
        setShareMessage('Error sharing file. Please try again.');
      }
    }
    };
    


  return (
    <form onSubmit={handleShare}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter recipient username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Upload File</button>
      {shareMessage && <p>{shareMessage}</p>}
    </form>
  );
  // return (
  //   <div>
  //     <h2>Share File</h2>
  //     <input
  //       type="text"
  //       placeholder="Enter recipient username"
  //       value={userName}
  //       onChange={(e) => setUserName(e.target.value)}
  //     />
  //     <button onClick={handleShare}>Share File</button>
  //     {shareMessage && <p>{shareMessage}</p>}
  //   </div>
  // );
}

export default ShareFile;