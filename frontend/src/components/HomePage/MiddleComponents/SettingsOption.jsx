import React from 'react';
import './SettingsOption.css';

const SettingsOption = ({ icon, title, description }) => {
  return (
    <div className="option">
      <div className="icon">{icon}</div>
      <div className="text">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SettingsOption;
