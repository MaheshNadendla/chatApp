import React, { useContext } from 'react'
import Chats from './MiddleComponents/Chats'
import Status from './MiddleComponents/Status'
import { ContextDef } from './contextDef';
import Channels from './MiddleComponents/Channels';
import Community from './MiddleComponents/Community';
import AIChat from './MiddleComponents/AIChat';
import Settings from './MiddleComponents/Settings';
import Profile from './MiddleComponents/Profile';
import AddFriends from './MiddleComponents/AddFriends';
import Notifications from './MiddleComponents/Notifications';

function Middle() {

    const middleCss={
        Middle:{

        width: '40%',
        height: '100vh'
        }
      }
  
  const {middlePage}= useContext(ContextDef);
  return (
    <div style={middleCss.Middle}>

      {
          middlePage==="chats" && <Chats />
      }
      {
          middlePage==="status" && <Status />
      }
      {
          middlePage==="channels" && <Channels />
      }
      {
          middlePage==="community" && <Community />
      }
      {
          middlePage==="ai" && <AIChat />
      }
      {
          middlePage==="settings" && <Settings />
      }
      {
          middlePage==="profile" && <Profile />
      }
      {
          middlePage==="addfriends" && <AddFriends/>
      }
      
     {
          middlePage==="notifications" && <Notifications/>
      }
      
      
    </div>
  )
}

export default Middle
