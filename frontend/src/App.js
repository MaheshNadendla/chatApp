// import React, { useState, useEffect } from "react";
// import socket from "./socket";

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("send_message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Socket.io Chat</h2>
//       <div style={{ minHeight: "200px", border: "1px solid black", padding: "10px" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p>
//         ))}
//       </div>
//       <input 
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default App;


import React from "react";
import AppSoc from "./components/AppSoc"
import FullApp from "./components/HomePage/FullApp";

import './App.css';
import SignUpLogin from "./components/SignUpLoginPage/SignUpLogin";

import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  

  return (
    <>
      <BrowserRouter>
      
          <Routes >
            <Route path="/" element={< Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUpLogin/>} />
            <Route path="/home" element={<FullApp/>} />
          </Routes>
      
      </BrowserRouter>

    </>
  );
};

export default App;
