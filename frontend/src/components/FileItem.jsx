/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function FileItem({ file }) {
  return (
    <div>
      <p>File: {file.filename}</p>
      <p>Date: {file.created_at}</p>
    </div>
  );
}

export default FileItem;
