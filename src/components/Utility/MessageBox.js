import React from 'react';
import './MessageBox.css'; // Create a CSS file for styling

const MessageBox = ({ message }) => {
  return (
    <div className="message-box">
      {message}
    </div>
  );
}

export default MessageBox;
