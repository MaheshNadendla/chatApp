import React, { useContext, useEffect, useState } from 'react';
import './AddFriends.css';

import { FaUserPlus } from "react-icons/fa";
import { axiosInstance } from '../../../lib/axios';
import toast from 'react-hot-toast';
import { ContextDef } from '../contextDef';

const AddFriends = () => {
  const [search, setSearch] = useState('');
  const [mySuggestions, setMySuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const { addFriendProfile,setAddFriendProfile} = useContext(ContextDef);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsSuggestionsLoading(true);
      try {
        const res = await axiosInstance.get("/users/search");
        console.log(res.data);
        setMySuggestions(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch messages");
      } finally {
        setIsSuggestionsLoading(false);
      }
    };

    fetchFriends();
  }, []); // Empty dependency to run only once

  const handleAddFriend = (friendId) => async () => {
    try {   
        const res = await axiosInstance.post(`/users/friend-request/${friendId}`);
        console.log(res.data.data);
        toast.success(res.data.message);
    } catch (error) {
        console.error(error);   
        toast.error(error.response?.data?.message || "Failed to send friend request");
    }   
    };


  const filteredFriends = mySuggestions.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase()) ||
    friend.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="add-friends-container">
      <div className="input-Div">
        <input
          type="text"
          className="search-input"
          placeholder="Find for a friend..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="suggested-friends">
        {filteredFriends.map(friend => (
          <div className="friend-card" key={friend._id} onClick={()=>setAddFriendProfile(friend)} style={{backgroundColor:friend===addFriendProfile ? "#f0f0f0" : "" }} >
            <img src={friend?.profilePic || "defaultImg.png"} alt={friend.name} className="friend-pic" />
            <div className="friend-info">
              <div className="friend-name">{friend.name}</div>
              <div className="friend-email">{friend.email}</div>
            </div>
            <button className="add-friend-btn" onClick={handleAddFriend(friend._id)}><FaUserPlus size={36} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriends;
