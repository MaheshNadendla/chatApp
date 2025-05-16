import React, { useContext } from "react";
import { FaUser, FaHouseUser } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import "./AddFriendRight.css";
import { ContextDef } from "../../contextDef";

const AddFriendComponent = () => {
  // const { authUser } = useContext(ContextDef);
  const { addFriendProfile,setAddFriendProfile} = useContext(ContextDef);

  return (
    <div className="add-friend-com-items-wrapper">
      <div className="add-friend-com-items-card">
        <h2 className="add-friend-com-items-title">User Details</h2>
        <p className="add-friend-com-items-subtitle">Viewing user information</p>

        <div className="add-friend-com-items-user">
          <img
            src={addFriendProfile.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="add-friend-com-items-avatar"
          />

          <div className="add-friend-com-items-field-label"><FaUser /> Full Name</div>
          <div className="add-friend-com-items-field-value">{addFriendProfile.name}</div>

          <div className="add-friend-com-items-field-label"><MdEmail /> Email Address</div>
          <div className="add-friend-com-items-field-value">{addFriendProfile.email}</div>

          <div className="add-friend-com-items-field-label"><FaHouseUser /> User Status</div>
          <div className="add-friend-com-items-field-value">{addFriendProfile.status}</div>

          <div className="add-friend-com-items-field-label"><FaRegCalendarCheck /> User since</div>
          <div className="add-friend-com-items-field-value">
              {new Date(addFriendProfile.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

          <div className="add-friend-com-items-field-label"><MdVerified /> is Verified</div>
          <div className="add-friend-com-items-field-value">
            {addFriendProfile.isVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendComponent;
