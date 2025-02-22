import React, { useContext, useEffect, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";



import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";

import { IoSendSharp } from "react-icons/io5";


import { RiEmojiStickerFill } from "react-icons/ri";
import socket from '../../../socket';
import { ContextDef } from '../contextDef';

function MessagePart() {

    const[inputValue,setInputValue] = useState("");
    const{userMessages,setUserMessages} = useContext(ContextDef);
    const{messages,setMessages} = useContext(ContextDef);




    const {chatName,yourName}= useContext(ContextDef);
   
    const room="abc";

    const [newUser,setNewUser]=useState(null);



    const sendMessage = () => {
        if(yourName!==chatName)
        setMessages((p)=>{return [{senderId:yourName,message: inputValue,reciverId : chatName},...p]});
        socket.emit("sendPrivateMessage",{chatName, inputValue});
        setInputValue(""); // Clear input
      
    };


     

    useEffect(() => {
      socket.on("new_user", (id) => {
        // console.log("Received new_user event:", id); // Debugging log
        setNewUser(id);
      });

        socket.on("receivePrivateMessage",(msg)=>{
          setMessages((p)=>{return [{senderId:msg[0],message:msg[1],reciverId : msg[2]},...p]});
          console.log(messages);
      })

      socket.emit("get_user_id");
    
      return () => {
        socket.off("new_user");
        socket.off("receivePrivateMessage");
      };
    }, []);


    console.log(messages);





  return (
    <div className='MessagePart'>
        <div className='Top'>
          
            <div className='RightPhoto'>
              <div className="RPhoto"></div>
            </div>
            <div className="RightName">
              <div className="RName">{yourName===chatName ? "You" : chatName} </div>
              <div className="RInfo">Click here for info</div>
            </div>
            <div className="RightIcons">
              <div className="RSearch"><GrSearch/></div>
              <div className="RThreeLines"><BsThreeDotsVertical/></div>
            </div>
          
        </div>


        <div className='Center'>
          
          {userMessages.map((msg, index) => (
            <span key={index} className="RMess">
              {msg.senderId } :{ msg.message} : {msg.reciverId }
            </span>
          ))}
          
        </div>



        <div className='Bottom'>
          <div className="Plus"><FaPlus/></div>

          <div className="InputBar">
            
            <button className="Sticker"><RiEmojiStickerFill /></button>
              <input value={inputValue} type="text" onChange={(e)=>setInputValue(e.target.value)} className="RInput" />
            </div>

          <div className="Mic">
            
            {inputValue!=="" ? <IoSendSharp onClick={ ()=>{
                sendMessage();

              } } /> : <FaMicrophone/>}
            
            </div>
        </div>
    </div>
  )
}

export default MessagePart
