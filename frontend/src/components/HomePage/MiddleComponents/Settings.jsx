import React, { useContext } from 'react';
import './Settings.css';
import SettingsOption from './SettingsOption';

import { MdLogout } from "react-icons/md";

import { FaKey, FaLock, FaComments, FaBell, FaKeyboard, FaQuestionCircle } from 'react-icons/fa';
import { ContextDef } from '../contextDef';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

  const{authUser,logout} =useContext(ContextDef);

  const navigate = useNavigate();

  const logoutSubmit = async (e) => {
    try {
      await logout();
      navigate('/signup')
      
    } catch (error) {
      console.log('Something went wrong');
    }
  };



  return (
    <div className="settings-container">

      <div className="settings-header">

        <h2>Settings</h2>
        <input type="text" placeholder="Search settings" className="search-input" />

        

      </div>


      <div className="profile-section">
          <img src={authUser?.profilePic || "/avatar.png"} alt="Profile" className="profile-pic" />
          <div className="settings-profile-info">
            <h3>{authUser?.name || "Mahesh"}</h3>
            <p> {authUser?.status || "Better to call, Instead text"}</p>
          </div>
        </div>

      <div className="options-list">
        <SettingsOption icon={<FaKey />} title="Account" description="Security notifications, account info" />
        <SettingsOption icon={<FaLock />} title="Privacy" description="Blocked contacts, disappearing messages" />
        <SettingsOption icon={<FaComments />} title="Chats" description="Theme, wallpaper, chat settings" />
        <SettingsOption icon={<FaBell />} title="Notifications" description="Message notifications" />
        <SettingsOption icon={<FaKeyboard />} title="Keyboard shortcuts" description="Quick actions" />
        <SettingsOption icon={<FaQuestionCircle />} title="Help" description="Help center, contact us, privacy policy" />
      </div>
      <div className="log-out-container">
        <button onClick={logoutSubmit} className="logout-class">
            <div className="logout-icon"><MdLogout/></div>
            <div className="logout-btn">Log out</div>
      </button>
      </div>
    </div>
  );
};

export default Settings;

