import React, { useContext } from "react";
import { FaUser, FaHouseUser, FaRegCalendarCheck } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import "./NotificationProfile.css";
import { ContextDef } from "../../contextDef";

const NotificationProfile = () => {
  const { notificationsProfile, setNotificationsProfile } = useContext(ContextDef);

  return (
    <div className="noti-profile-wrapper">
      <div className="noti-profile-card">
        <h2 className="noti-profile-title">User Details</h2>
        <p className="noti-profile-subtitle">Viewing user information</p>

        <div className="noti-profile-user">
          <img
            src={notificationsProfile.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="noti-profile-avatar"
          />

          <div className="noti-profile-field-label"><FaUser /> Full Name</div>
          <div className="noti-profile-field-value">{notificationsProfile.name}</div>

          <div className="noti-profile-field-label"><MdEmail /> Email Address</div>
          <div className="noti-profile-field-value">{notificationsProfile.email}</div>

          <div className="noti-profile-field-label"><FaHouseUser /> User Status</div>
          <div className="noti-profile-field-value">{notificationsProfile.status}</div>

          <div className="noti-profile-field-label"><FaRegCalendarCheck /> User since</div>
          <div className="noti-profile-field-value">
            {new Date(notificationsProfile.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="noti-profile-field-label"><MdVerified /> is Verified</div>
          <div className="noti-profile-field-value">
            {notificationsProfile.isVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationProfile;
