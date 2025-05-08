import React, { useContext } from 'react'
import { ContextDef } from '../../contextDef';
import './User.css'


function User({user}) {

  const {setChatName} = useContext(ContextDef);
  const{messages,setMessages} = useContext(ContextDef)
  const{userMessages,setUserMessages} = useContext(ContextDef);
  const{yourName,selectedUser, setSelectedUser}= useContext(ContextDef);

  const {onlineUsers, setOnlineUsers} = useContext(ContextDef)




  const showMessages = () => {
    // setChatName(user.name);

    

    setSelectedUser(user)

    console.log("the user : ",user)
    
    
    // let filteredMessages = [];
  
    // console.log(yourName + "  " + user.name);
    // console.log(`These are messages :`, messages); 
  
    // messages.forEach(user => {

    //   console.log("user here : ",user,user.name,yourName)

    //   console.log("userId : ",user.senderId,"your name : ",yourName,"reciverId : ",user.receiverId,"name : ",user.name)

    //   if ((user.senderId === yourName && user.receiverId === user.name) || 
    //       (user.senderId === user.name && user.receiverId === yourName)) {

            

    //     filteredMessages.push({
    //       senderId: user.senderId,
    //       message: user.message,
    //       receiverId: user.receiverId
    //   ``  });
    //   }
    // });
  
   
    // setUserMessages(filteredMessages);
  
    // console.log(`User Messages :`, filteredMessages);
  };



  return (
    <div className='UserBoxs'>

        <div onClick={showMessages} className='User'>
                
                <div className="PhotoBox">
                  <div className="Photo">
                    <img src={user?.profilePic || 'defaultImg.png'} alt="User Photo" />
                  </div>
                </div>
                <div className='MessagesInfo'>
                    <div className='NameBox'>
                      <div className='Name'>{user?.name}</div>
                      <div className='Time'>
                        {onlineUsers.includes(user?._id) ? "online" : "offline"}
                        
                        </div>
                    </div>
                    <div className='MessageBox'>
                      <div className='Message'>{user?.email}</div>
                      <div className='UnreadCount'>5</div>
                    </div>
                </div>
            
        </div>
        <div className='LineBox'>
                    <div className='Empty'></div>
                    <div className='Line'></div>
        </div>

      
    </div>
  )
}

export default User
