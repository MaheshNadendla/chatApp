import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import './StatusViewer.css';
import { ContextDef } from '../../contextDef';
import BtnLoader from '../../../utils/BtnLoader';

const StatusViewer = () => {
  const { selectedUserStatus, setSelectedUserStatus } = useContext(ContextDef);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!selectedUserStatus || selectedUserStatus.length === 0) {
    return <div className="no-status">No status available</div>;
  }

const handlePrev = () => {
  setIsLoading(true);
  setCurrentIndex((prev) => {
    if (prev <= 0) {
      setSelectedUserStatus(null); // Close viewer if trying to go back past first
      return 0;
    }
    return prev - 1;
  });
};

const handleNext = () => {
  setIsLoading(true);
  setCurrentIndex((prev) => {
    if (prev >= selectedUserStatus.length - 1) {
      setSelectedUserStatus(null); // Close viewer if past last
      return prev;
    }
    return prev + 1;
  });
};

  const handleClose = () => {
    setSelectedUserStatus(null);
  };

  const currentStatus = selectedUserStatus[currentIndex];

  return (
    <div className="status-viewer">
      <div className="status-progress">
        {selectedUserStatus.map((_, idx) => (
          <div
            key={idx}
            className={`progress-line ${idx === currentIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>

      <button className="close-button" onClick={handleClose}>
        <FaTimes />
      </button>

      <div className="status-content">
        {isLoading && <div className="loader"><BtnLoader/></div>}
        <img
          src={currentStatus?.videoUrl}
          alt="status"
          className="status-image"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <button className="nav-button left" onClick={handlePrev}>
        <FaArrowLeft />
      </button>

      <button className="nav-button right" onClick={handleNext}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default StatusViewer;
