/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function FileItem({ file }) {

  const handleDownload = () => {
    if (file.downloadUrl) {
      window.open(file.downloadUrl, '_blank');
    } else {
      console.warn('Download URL not available for this file.');
    }
  };

  return (
    <div>
      <p>File: {file.filename}</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default FileItem;
