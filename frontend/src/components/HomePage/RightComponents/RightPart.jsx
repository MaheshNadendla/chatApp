import React from 'react';
import './RightPart.css';


const RightPart = () => {


    const handleDownload =()=> {
        alert('Downloading WhatsApp for Windows...');
      }


  return (
    <div className="container">
      <img src="RightImg.png" alt="WhatsApp Download" className="main-image" />

      <h1>Download WhatsApp for Windows</h1>
      <p className="description">
        Make calls, share your screen and get a faster experience when you download the Windows app.
      </p>

      <button onClick={handleDownload} className="download-btn">
        Download
      </button>

      <p className="secure-msg">
        <span role="img" aria-label="lock">🔒</span> Your personal messages are end-to-end encrypted
      </p>
    </div>
  );
};

export default RightPart;
