import React, { useContext, useEffect, useState } from 'react';
import './Notifications.css';
import { FaUserClock, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../lib/axios';
import { ContextDef } from '../contextDef';

const FriendRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [acceptedRequestsByYou, setAcceptedRequestsByYou] = useState([]); // ✅ NEW
  const [acceptedRequestsByThem, setAcceptedRequestsByThem] = useState([])
  const { notificationsProfile, setNotificationsProfile } = useContext(ContextDef); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const [friendRequests, acceptedRequests] = await Promise.all([
          axiosInstance.get('/users/friend-requests'),
          axiosInstance.get('/users/accepted-requests'),
        ]);

        setIncomingRequests(friendRequests.data.incomingReqs);
        setOutgoingRequests(friendRequests.data.outgoingReqs);

        setAcceptedRequestsByYou(acceptedRequests.data.acceptedReqsByYou); // ✅ SET acceptedReqs
        setAcceptedRequestsByThem(acceptedRequests.data.acceptedReqsByThem)

        console.log(friendRequests);
        console.log(acceptedRequests);
        
      } catch (error) {
        toast.error('Error fetching friend data');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, []);

  const handleAccept = (userId) => async () => {
    try {
      const res = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
      toast.success(res.data.message);

        setIncomingRequests(prev => {
          const updated = prev.filter(user => user._id !== userId);
          const movedUser = prev.find(user => user._id === userId);
          if (movedUser) {
            setAcceptedRequestsByYou(prevAccepted => [...prevAccepted, movedUser]);
          }
          return updated;
        });
        
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    }
  };

  return (
    <div className="friend-requests-container">
      <h2 className="section-title">Friend Requests Received</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="requests-list">
          {incomingRequests.length > 0 ? (
            incomingRequests.map(req => (
              <div className="request-card" key={req._id} onClick={() => setNotificationsProfile(req.sender)}  style={{backgroundColor:notificationsProfile===req.sender ?"#f0f0f0":""}} >
                <img
                  src={req?.sender?.profilePic || 'defaultImg.png'}
                  alt={req?.sender?.name}
                  className="request-pic"
                />
                <div className="request-info">
                  <span className="request-name">{req?.sender?.name}</span>
                  <span className="request-email">{req?.sender?.email}</span>
                </div>
                <button className="accept-btn" onClick={handleAccept(req._id)}>
                  <FcOk size={36} />
                </button>
              </div>
            ))
          ) : (
            <p className="empty-text">No friend requests received.</p>
          )}
        </div>
      )}

      <h2 className="section-title">Friend Requests Sent</h2>
      <div className="requests-list">
        {outgoingRequests.length > 0 ? (
          outgoingRequests.map(req => (
            <div className="request-card" key={req._id} onClick={() => setNotificationsProfile(req.recipient)} style={{backgroundColor:notificationsProfile===req.recipient ?"#f0f0f0":""}} >
              <img
                src={req?.recipient?.profilePic || 'defaultImg.png'}
                alt={req?.recipient?.name}
                className="request-pic"
              />
              <div className="request-info">
                <span className="request-name">{req?.recipient?.name}</span>
                <span className="request-email">{req?.recipient?.email}</span>
              </div>
              <div className="sent-icon">
                <FaUserClock size={32} color="#999" />
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No friend requests sent.</p>
        )}
      </div>

      {/* ✅ Accepted Requests Section */}
      <h2 className="section-title">Friend Requests Accepted By You</h2>
      <div className="requests-list">
        {/* {acceptedRequests?.length > 0 ? (
          acceptedRequests.map(friend => (
            <div className="request-card" key={friend._id}>
              <img
                src={friend?.sender?.profilePic || 'defaultImg.png'}
                alt={friend?.sender?.name}
                className="request-pic"
              />
              <div className="request-info">
                <span className="request-name">{friend?.sender?.name}</span>
                <span className="request-email">{friend?.sender?.email}</span>
              </div>
              <div className="accepted-icon">
                <FaUserCheck size={24} color="green" />
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No friends accepted yet.</p>
        )} */}


      {acceptedRequestsByYou?.length > 0 ? (
        acceptedRequestsByYou.map((friend, index) => {
          const sender = friend?.sender || friend; // fallback if sender is undefined
          const uniqueKey = sender?._id || index;  // fallback to index if _id missing

          return (
            <div className="request-card" key={uniqueKey} onClick={() => setNotificationsProfile(sender)} style={{backgroundColor:notificationsProfile===sender ?"#f0f0f0":""}} >
              <img
                src={sender?.profilePic || 'defaultImg.png'}
                alt={sender?.name}
                className="request-pic"
              />
              <div className="request-info">
                <span className="request-name">{sender?.name}</span>
                <span className="request-email">{sender?.email}</span>
              </div>
              <div className="accepted-icon">
                <FaUserCheck size={32} color="green" />
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty-text">No friend requests accepted by you yet.</p>
      )}


      </div>



       <h2 className="section-title">Friend Requests Accepted By Your Friends</h2>
      <div className="requests-list">
      {acceptedRequestsByThem?.length > 0 ? (
        acceptedRequestsByThem.map((friend, index) => {
          const recipient = friend?.recipient || recipient; // fallback if recipient is undefined
          const uniqueKey = recipient?._id || index;  // fallback to index if _id missing

          return (
            <div className="request-card" key={uniqueKey} onClick={() => setNotificationsProfile(recipient)}  style={{backgroundColor:notificationsProfile===recipient ?"#f0f0f0":""}} >
              <img
                src={recipient?.profilePic || 'defaultImg.png'}
                alt={recipient?.name}
                className="request-pic"
              />
              <div className="request-info">
                <span className="request-name">{recipient?.name}</span>
                <span className="request-email">{recipient?.email}</span>
              </div>
              <div className="accepted-icon">
                <FaUserCheck size={32} color="green" />
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty-text">No friend requests accepted your friends yet.</p>
      )}
      </div>

    </div>
  );
};

export default FriendRequests;
