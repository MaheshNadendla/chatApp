import React, { useState, useEffect, useRef, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import MyStatus from "./SubMiddle/MyStatus";
import StatusVideo from "./SubMiddle/StatusVideo";
import "./Status.css";
import { ContextDef } from "../contextDef";
import { axiosInstance } from "../../../lib/axios";
import BtnLoader from "../../utils/BtnLoader";
import toast from "react-hot-toast";

function Status() {
  const { authUser } = useContext(ContextDef);
  const [friendStatuses, setFriendStatuses] = useState([]);
  const fileInputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);



 const [groupedStatuses, setGroupedStatuses] = useState({});

useEffect(() => {
  const fetchStatuses = async () => {
    try {
      const { data } = await axiosInstance.get("/messages/status/friends");

      // Grouping logic
      const grouped = {};
      data.forEach((status) => {
        const userId = status.user._id;
        if (!grouped[userId]) {
          grouped[userId] = {
            user: status.user, // store user info once
            statuses: [],
          };
        }
        grouped[userId].statuses.push(status);
      });

      setGroupedStatuses(grouped);
    } catch (err) {
      console.error("Failed to load statuses:", err);
    }
  };

  fetchStatuses();
}, []);

  const handleAddClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if (!selectedFile || !previewSrc) return;
    setIsUploading(true);

    try {
      const res = await axiosInstance.post("/messages/status", {
        image: previewSrc,
      });

      toast.success(res.data.message);

      // Refresh status feed
      const { data } = await axiosInstance.get("/messages/status/friends");
      setFriendStatuses(data);

      // Clear preview and file
      setSelectedFile(null);
      setPreviewSrc(null);
    } catch (err) {
      toast.error("Failed to upload status");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  return (
    <div className="Status">
      <div className="StatusHeader">
        <label className="StatusLabel">Status</label>

        <div className="StatusButtons">
          {/* 3 Dots icon */}
          <div className="Icon">
            <div className="StatusThreeLines">
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* + (Add) Icon */}
          <div className="Icon" onClick={handleAddClick}>
            <div className="StatusPlus">
              <FaPlus />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="StatusBar">
        <MyStatus />
        <div className="StatusBox">
            {Object.keys(groupedStatuses).length === 0 ? (
              <div className="no-status">No statuses available</div>
            ) : (
              Object.values(groupedStatuses).map((group) => (
                <StatusVideo
                  key={group.user._id}
                  status={group} // Contains { user, statuses: [...] }
                />
              ))
            )}
        </div>
      </div>

      {/* Fullscreen Preview Overlay */}
      {previewSrc && (
        <div className="StatusPreviewOverlay">
          <div className="StatusPreviewContent">
            <button
              className="StatusPreviewSend"
              onClick={handleSend}
              disabled={isUploading}
            >
              {isUploading ? <BtnLoader size="sm" /> : "Upload"}
            </button>

            <button className="StatusPreviewClose" onClick={handleClear}>
              <FaTimes />
            </button>

            {selectedFile.type.startsWith("video") ? (
              <video src={previewSrc} controls />
            ) : (
              <img src={previewSrc} alt="Preview" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
