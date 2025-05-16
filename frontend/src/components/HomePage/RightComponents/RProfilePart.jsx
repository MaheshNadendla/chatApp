import React, { useContext } from "react";
import { FaUser, FaHouseUser } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import "./RProfilePart.css"; // renamed CSS file
import { ContextDef } from "../contextDef";



const RProfilePart = () => {
  const { authUser } = useContext(ContextDef);

  return (
    <div className="profile-com-wrapper">
      <div className="profile-com-card">
        <h2 className="profile-com-title">User Details</h2>
        <p className="profile-com-subtitle">Viewing user information</p>

        <div className="profile-com-user">
          <img
            src={authUser.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="profile-com-avatar"
          />

          <div className="profile-com-field-label"><FaUser /> Full Name</div>
          <div className="profile-com-field-value">{authUser.name}</div>

          <div className="profile-com-field-label"><MdEmail /> Email Address</div>
          <div className="profile-com-field-value">{authUser.email}</div>

          <div className="profile-com-field-label"><FaHouseUser /> User Status</div>
          <div className="profile-com-field-value">{authUser.status}</div>

          <div className="profile-com-field-label"><FaRegCalendarCheck /> User since</div>
          <div className="profile-com-field-value">
            {new Date(authUser.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="profile-com-field-label"><MdVerified /> is Verified</div>
          <div className="profile-com-field-value">
            {authUser.isVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RProfilePart;
