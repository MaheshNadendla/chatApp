import React, { useContext } from 'react'
import MessagePart from './RightComponents/MessagePart'
import { ContextDef } from './contextDef';
import RStatus from './RightComponents/RStatus';
import RCommunity from './RightComponents/RCommunity';
import RChannels from './RightComponents/RChannels';
import RSettings from './RightComponents/RSettings';
import RAddFriends from './RightComponents/RAddFriends';
import RNotifications from './RightComponents/RNotifications';
import AIChatCard from './RightComponents/RAiChat';
import RProfilePart from './RightComponents/RProfilePart';


function Right() {


  const {middlePage}=useContext(ContextDef);


  const rightStyle = {
    height: '100%',
    width: '55%',
    backgroundColor: '#f0f2f5',
  };

  return (
    <div style={rightStyle}>
      {
        middlePage=='chats' && (<MessagePart/>)
      }

       {
        middlePage=='status' && (<RStatus/>)
      }

      {
          middlePage==="channels" && (<RChannels/>)
      }
      {
          middlePage==="community" && (<RCommunity/>)
      }
      {
          middlePage==="ai" && (<AIChatCard/>)
      }
      {
          middlePage==="settings" && (<RSettings/>)
      }
      {
          middlePage==="profile" && (<RProfilePart/>)
      }
      {
          middlePage==="addfriends" && (<RAddFriends/>)
      }
      
      {
          middlePage==="notifications" && (<RNotifications/>)
      }
        
    </div>
  )
}

export default Right
