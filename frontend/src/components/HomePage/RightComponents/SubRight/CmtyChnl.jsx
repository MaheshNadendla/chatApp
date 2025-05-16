import React from 'react';
import './CmtyChnl.css';

const CmtyChnl = ({ logo, name, bio, followers, followed }) => {
  return (
    <div className="cmty-container">
      <div className="cmty-card">
        <div className="cmty-card-content">
        <img
          src={logo}
          alt={`${name} logo`}
          className="cmty-logo"
        />
        <h2 className="cmty-name">{name}</h2>
        <p className="cmty-bio">{bio}</p>
        <button className="cmty-follow-button">
          {followed ? 'Following' : 'Follow'}
        </button>
        <p className="cmty-follower-count">{followers} Followers</p>
        </div>
      </div>
    </div>
  );
};

export default CmtyChnl;
