import React, { useContext, useEffect, useState } from 'react';
import { GrSearch } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { RiEmojiStickerFill } from "react-icons/ri";
import socket from '../../../socket';
import { ContextDef } from '../contextDef';

function MessagePart() {
  const [inputValue, setInputValue] = useState("");
  const { userMessages, setUserMessages } = useContext(ContextDef);
  const { messages, setMessages } = useContext(ContextDef);
  const { chatName, yourName } = useContext(ContextDef);

  const [newUser, setNewUser] = useState(null);

  // Function to send the message
  const sendMessage = () => {
    // Update local message state
    setMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);
    setUserMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);


    // Emit to server
    socket.emit("sendMessage", inputValue);

    // Log the sent message to console
    console.log('Sent message:', inputValue);

    console.log(messages)

    // Clear input
    setInputValue("");
  };

  const handleSendPrivateMessage =()=>{

    setMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);
    setUserMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);

    // Emit to server
    socket.emit("sendPrivateMessage",{ senderId: yourName, message: inputValue, receiverId: chatName });

    // Log the sent message to console
    console.log('Sent message:', inputValue);

    // Clear input
    setInputValue("");


  }


  


  useEffect(() => {
    const handleNewUser = ( msg) => {
      setNewUser(msg.uid);
      console.log('New user connected:', msg.sid); // Log new user connection
    };

    const handleReceivePrivateMessage = (msg) => {
      setMessages((p) => [...p,{ senderId: msg.senderId, message: msg.inputValue, receiverId: msg.chatName }]);
      setUserMessages((p) => [...p,{ senderId: msg.senderId, message: msg.inputValue, receiverId: msg.chatName }]);
      console.log('Received message:', msg); // Log received message
      console.log(messages)
    };

    const handleReceiveMessage = (msg) => {
      setMessages((p) => [msg, ...p]);
      setUserMessages((p) => [msg, ...p]);
      console.log('Received message:', msg); // Log received message
      console.log(messages)
    };

    socket.on("new_user", handleNewUser);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("receivePrivateMessage",handleReceivePrivateMessage)

    socket.emit("get_user_id");

    return () => {
      socket.off("new_user", handleNewUser);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("receivePrivateMessage", handleReceivePrivateMessage);
    };
  }, []);

  return (
    <div className='MessagePart'>
      <div className='Top'>
        <div className='RightPhoto'>
          <div className="RPhoto"></div>
        </div>
        <div className="RightName">
          <div className="RName">{yourName === chatName ? "You" : chatName} </div>
          <div className="RInfo">Click here for info</div>
        </div>
        <div className="RightIcons">
          <div className="RSearch"><GrSearch /></div>
          <div className="RThreeLines"><BsThreeDotsVertical /></div>
        </div>
      </div>

      <div className='Center'>
        {userMessages.map((msg, index) => (
          <span key={index} className="RMess">
            {msg.senderId} : {msg.message}
          </span>
        ))}
      </div>

      <div className='Bottom'>
        <div className="Plus"><FaPlus /></div>
        <div className="InputBar">
          <button className="Sticker"><RiEmojiStickerFill /></button>
          <input
            value={inputValue}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            className="RInput"
          />
        </div>
        <div className="Mic">
          {inputValue !== ""
            ? <IoSendSharp onClick={handleSendPrivateMessage} />
            : <FaMicrophone />}
        </div>
      </div>
    </div>
  );
}

export default MessagePart;
