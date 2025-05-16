import React, { useContext } from 'react';
import './StatusVideo.css';
import { ContextDef } from '../../contextDef';

function StatusVideo({ status }) {
  const { selectedUserStatus,setSelectedUserStatus } = useContext(ContextDef);



  const lastStatus = status.statuses[status.statuses.length - 1];
  const formattedTime = new Date(lastStatus.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className='StatusVideoBox' onClick={()=>{setSelectedUserStatus(status.statuses)}} style={{backgroundColor:status?.user?._id===selectedUserStatus?.user?._id ? "" : ""}} >
      <div className='LineBox'>
        <div className='Empty'></div>
        <div className='Line'></div>
      </div>

      <div className='OthersStatus'>

        <div className='OthersStatusPhotoBox'>
          <div
            className='OthersStatusPhotoRing'
            style={{
              background: `conic-gradient(
                blue 0% ${100 / status.statuses.length - 1}%,
                transparent ${100 / status.statuses.length - 1}% ${100 / status.statuses.length}%,
                ${Array(status.statuses.length - 1)
                  .fill(0)
                  .map((_, i) => {
                    const start = (i + 1) * (100 / status.statuses.length);
                    return `blue ${start}% ${start + (100 / status.statuses.length - 1)}%, transparent ${start + (100 / status.statuses.length - 1)}% ${start + (100 / status.statuses.length)}%`;
                  })
                  .join(',')}
              )`,
            }}
          >
            <div className='OthersStatusPhoto'>
              <img src={status.user.profilePic || 'defaultImg.png'} alt='profile' />
            </div>
          </div>
        </div>


        <div className='OthersStatusMessagesInfo'>
          <div className='OthersMyStatusName'>{status.user.name}</div>
          <div className='OthersStatusClick'>{formattedTime}</div>
        </div>

      </div>
    </div>
  );
}

export default StatusVideo;
