import React, { useContext, useEffect, useRef, useState } from 'react';
import { GrSearch } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { RiEmojiStickerFill } from "react-icons/ri";
import { FaPhotoVideo } from "react-icons/fa";
// import socket from '../../../socket';
import { ContextDef } from '../contextDef';

import BtnLoader from '../../utils/BtnLoader'


import './MessagePart.css'
import RightPart from './RightPart';
import { ChatBubble } from './ChatBubble';

import toast from 'react-hot-toast'
import TypingDots from './SubRight/TypingDots';
// import socket from '../../../socket';

function MessagePart() {
  const [inputValue, setInputValue] = useState("");
  const [sendingMessageLoader,setSendingMessageLoader]=useState(false)
  const { userMessages, setUserMessages,socket } = useContext(ContextDef);

  const {typingStatus, setTypingStatus,typers,setTypers}=useContext(ContextDef);
  const{ messages,getMessages,isMessagesLoading,selectedUser, authUser,subscribeToMessages,unsubscribeFromMessages,sendMessage,setMessages}= useContext(ContextDef);
  

  // const { messages, setMessages } = useContext(ContextDef);
  const { chatName, yourName } = useContext(ContextDef);

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);



  const messageInputHadle = (e)=>{

    setInputValue(e.target.value)


    socket.emit("typing", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });


  
  

  }


  const handleImageChange = (e) => {

    const file = e.target.files?.[0];
    if (!file) {
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    e.target.value = "";

  };





  useEffect(() => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [selectedUser]);
  


  // console.log(messages)


  useEffect(() => {
    // console.log("hello")
    if (!selectedUser?._id) return;

    getMessages(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();


    
  }, [selectedUser?._id,subscribeToMessages,unsubscribeFromMessages]);



  // useEffect(() => {
  //   if (!selectedUser?._id || !socket) return;
  
  //   getMessages(selectedUser._id);
  
  //   console.log("hello2");
  //   console.log("Socket connected:", socket?.connected);
  //   console.log("Subscribed to newMessage for", selectedUser._id);
  
  //   const handleNewMessage = (newMessage) => {
  //     console.log("New message received from socket:", newMessage);
  
  //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  //     console.log("Incoming message senderId:", newMessage.senderId);
  //     console.log("Selected user _id:", selectedUser._id);
  
  //     if (!isMessageSentFromSelectedUser) return;
  
  //     setMessages((prev) => {
  //       console.log("Adding new message to state");
  //       return [...prev, newMessage]; // ❓ this still seems odd
  //     });
  //   };
  
  //   socket.off("newMessage"); // Always clear old handler before setting new one
  //   socket.on("newMessage", handleNewMessage);
  
  //   return () => {
  //     console.log("Unsubscribing from newMessage");
  //     socket.off("newMessage", handleNewMessage);
  //   };
  // }, [selectedUser?._id, socket]); // ✅ Clean dependencies
  



  
  // console.log(messages)



  


  const [newUser, setNewUser] = useState(null);









  const handleSendPrivateMessage = async (e) => {

    console.log("sending message in handleSendPrivateMessage")

    setSendingMessageLoader(true)

    e.preventDefault();
    if (!inputValue.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: inputValue.trim(),
        image: imagePreview,
      });

      // Clear form
      setInputValue("")
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    finally{
      setSendingMessageLoader(false)
    }
  };


  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,typers]); // Trigger effect when messages change



  useEffect(() => {
  const interval = setInterval(() => {
    setTypers((prev) => {
      if (prev.length === 0) return prev; // do nothing if empty
      const updated = prev.slice(0, -1); // remove last item
      return updated;
    });
  }, 4000); // every 3 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);



  // console.log(typingStatus)

  // console.log("messages : ",messages)

  


  if(!selectedUser)
  {
    return <><RightPart/></>
  }

  return (
    <div className='MessagePart'>
      <div className='Top'>
        <div className='RightPhoto'>
          <div className="RPhoto">
            <img src={selectedUser?.profilePic || 'defaultImg.png'} alt="User Photo" />
          </div>
        </div>
        <div className="RightName">
          <div className="RName">{authUser?._id === selectedUser?._id ? "You" : selectedUser?.name} </div>
          <div className="RInfo">Click here for info</div>
        </div>
        <div className="RightIcons">
          <div className="RSearch"><GrSearch /></div>
          <div className="RThreeLines"><BsThreeDotsVertical /></div>
        </div>
      </div>

      <div className='Center'>

      {imagePreview && (
          <div className="ImagePreviewContainer">
            <img src={imagePreview} alt="Preview" className="PreviewImage" />
            <button onClick={() => setImagePreview(null)} className="CancelPreview">❌</button>
          </div>
      )}


        {messages.map((msg, index) => (

          // RMess=> className

          <span key={index} className="">

            <ChatBubble
              message={msg?.text}
              image={msg?.image}
              isSender={authUser?._id === msg?.senderId}
              time={new Date(msg?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              status={authUser?._id === msg?.senderId ? "sent" : ""}
            />

           
          </span>
        ))}

         {typers.some((typer) => typer.id === selectedUser._id) && <TypingDots/>}

         {/* {typingStatus && (<p>typing</p>)} */}

          <div ref={messagesEndRef} /> 



      </div>

      <div className='Bottom'>
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

        <button  onClick={() => fileInputRef.current?.click()} className="Plus"><FaPhotoVideo /> </button>
        <div className="InputBar">
          <button className="Sticker"><RiEmojiStickerFill /></button>
          <input
            value={inputValue}
            type="text"
            onChange={messageInputHadle}
            className="RInput"
          />
        </div>
        <div className="Mic">
          {sendingMessageLoader ? (<BtnLoader/>) :
          
          
          inputValue !== "" || imagePreview
            ? <IoSendSharp onClick={handleSendPrivateMessage} />
            : <FaMicrophone />}


        </div>
      </div>
    </div>
  );
}

export default MessagePart;
















  // Function to send the message
  // const sendMessage = () => {
  //   // Update local message state
  //   // setMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);
  //   setUserMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);


  //   // Emit to server
  //   // socket.emit("sendMessage", inputValue);

  //   // Log the sent message to console
  //   console.log('Sent message:', inputValue);

  //   console.log(messages)

  //   // Clear input
  //   setInputValue("");
  // };


  //const handleSendPrivateMessage =()=>{





   // console.log(inputValue)
    //sendMessage({text : inputValue,})
    //setInputValue("")





    // setMessages(p => [ { senderId: yourName, message: inputValue, receiverId: chatName },...p]);
    // setUserMessages(p => [{ senderId: yourName, message: inputValue, receiverId: chatName },...p]);

    // // Emit to server
    // // socket.emit("sendPrivateMessage",{ senderId: yourName, message: inputValue, receiverId: chatName });

    // // Log the sent message to console
    // console.log('Sent message:', inputValue);

    // // Clear input
    // setInputValue("");


  //}


  


  // useEffect(() => {
  //   const handleNewUser = ( msg) => {
  //     setNewUser(msg.uid);
  //     console.log('New user connected:', msg.sid); // Log new user connection
  //   };

  //   const handleReceivePrivateMessage = (m) => {
  //     console.log("message : ", m);

  //     // senderId: 'KSCriGPy6sxMB_vvAAAz', message: 'hello', receiverId: 'RnXhu9vfHcWmhw6uAAAx
    
  //     setMessages((p) => [ {
  //       senderId: m.senderId,
  //       message: m.message,
  //       receiverId: m.receiverId,
  //     },...p]);
    
  //     setUserMessages((p) => [ {
  //       senderId: m.senderId,
  //       message: m.message,
  //       receiverId: m.receiverId,
  //     },...p]);
    
  //     console.log('Received message:', m); 
  //     console.log(messages)
  //     // Do NOT rely on messages here — it won't show the new one yet.
  //   };
    

  //   const handleReceiveMessage = (msg) => {
  //     setMessages((p) => [msg, ...p]);
  //     setUserMessages((p) => [msg, ...p]);
  //     console.log('Received message:', msg); // Log received message
  //     console.log(messages)
  //   };

  //   socket.on("new_user", handleNewUser);
  //   socket.on("receiveMessage", handleReceiveMessage);
  //   socket.on("receivePrivateMessage",handleReceivePrivateMessage)

  //   socket.emit("get_user_id");

  //   return () => {
  //     socket.off("new_user", handleNewUser);
  //     socket.off("receiveMessage", handleReceiveMessage);
  //     socket.off("receivePrivateMessage", handleReceivePrivateMessage);
  //   };
  // }, []);

  
 




 

  // console.log("selected : ",selectedUser,authUser)


  // console.log("chatName : ",chatName)