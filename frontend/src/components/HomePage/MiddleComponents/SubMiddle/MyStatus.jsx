import React, { useContext, useEffect, useState } from 'react';
import './StatusVideo.css';
import { axiosInstance } from '../../../../lib/axios';
import { ContextDef } from '../../contextDef';

function MyStatus() {
  const [myStatuses, setMyStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {selectedUserStatus,setSelectedUserStatus } = useContext(ContextDef);

  useEffect(() => {
    const fetchMyStatuses = async () => {
      try {
        const response = await axiosInstance.get("/messages/status/my");
        setMyStatuses(response.data);
      } catch (error) {
        console.error("Error fetching your status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStatuses();
  }, []);

  const handleClick = () => {
    setSelectedUserStatus(myStatuses);
  };

  if (loading || myStatuses.length === 0) return null;

  const lastStatus = myStatuses[myStatuses.length - 1];
  const user = myStatuses[0].user;
  const formattedTime = new Date(lastStatus.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Generate conic-gradient segments
  const segments = myStatuses.length;
  const segmentAngle = 360 / segments;
  let conicGradient = '';
  for (let i = 0; i < segments; i++) {
    const start = i * segmentAngle;
    const end = start + segmentAngle - 2;
    conicGradient += `blue ${start}deg ${end}deg, transparent ${end}deg ${start + segmentAngle}deg, `;
  }
  conicGradient = `conic-gradient(${conicGradient.slice(0, -2)})`;

  console.log("myStatuses : ",myStatuses,"selectedUserStatus : ",selectedUserStatus)

  return (
    <div className='StatusVideoBox' onClick={handleClick} style={{backgroundColor:myStatuses?.user?._id===selectedUserStatus?.user?._id ? "" : ""}} >
      <div className='LineBox'>
        <div className='Empty'></div>
        
      </div>

      <div className='OthersStatus'>
        <div className='OthersStatusPhotoBox'>
          <div
            className='OthersStatusPhotoRing'
            style={{ background: conicGradient }}
          >
            <div className='OthersStatusPhoto'>
              <img src={user.profilePic || 'defaultImg.png'} alt='profile' />
            </div>
          </div>
        </div>

        <div className='OthersStatusMessagesInfo'>
          <div className='OthersMyStatusName'>{ `MyStatus (${user.name})` }</div>
          <div className='OthersStatusClick'>{`click here for more info (${formattedTime})`}</div>
        </div>
      
      </div>
    </div>
  );
}

export default MyStatus;
