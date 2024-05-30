/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../api';


function ShareFile({ fileId, onClose }) {
  const [username, setUsername] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const handleShare = async () => {
    try {
      const response = await api.post(`/api/files/${fileId}/share/`, {
        username,
      });
      setShareMessage('File shared successfully!');
    } catch (error) {
      console.error('Error sharing file:', error);
      const errorMessage = error.response?.data?.error || 'Error sharing file.';
      setShareMessage(errorMessage);
    }
  };

  return (
    <div>
      <h2>Share File</h2>
      <input
        type="text"
        placeholder="Enter recipient username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleShare}>Share File</button>
      {shareMessage && <p>{shareMessage}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ShareFile;
