// import { createContext, useContext, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// import toast from "react-hot-toast";
// import { io } from "socket.io-client";


// const BASE_URL = "http://localhost:5000";

// export const ContextDef = createContext();

// const ContextProvider = (props) => {

 

//   const [authUser, setAuthUser] = useState(null);
//   const [isSigningUp, setIsSigningUp] = useState(false);
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [socket, setSocket] = useState(null);

//   const [middlePage, setMiddlePage] = useState("chats");
//   const [chatName, setChatName] = useState(null);
//   const [yourName, setYourName] = useState(null);
//   const [messages, setMessages] = useState([{ senderId: null, message: null, receiverId: null }]);
//   const [userMessages, setUserMessages] = useState([{ senderId: null, message: null, receiverId: null }]);


//   const checkAuth = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       setAuthUser(res.data);
//       console.log(res.data)
//     //   connectSocket();
//     } catch (error) {
//       console.log("Error in checkAuth:", error);
//       setAuthUser(null);
//     } finally {
//       setIsCheckingAuth(false);
//     }
//   };

//   const signup = async (data) => {
//     setIsSigningUp(true);
//     try {

//         const response = await axiosInstance.post('/auth/signup', data);
      
//         console.log(response)

//         if (response.status === 201) {
//             console.log('Sign up successful:', response.data);
//             setAuthUser(response.data);
//             toast.success(response.data.message || "Sign up successful" , {
//             duration: 3000,
//             position: 'top-center', 
//             });
//             return true;
//         }
//         else{
//             toast.error(response.data.message || 'Something went wrong', {
//                 duration: 3000,
//                 position: 'top-center', 
//             });
//             return false;
//         }
//     //   connectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       setIsSigningUp(false);
//     }
//   };

//   const login = async (data) => {
//     setIsLoggingIn(true);
//     try {

//         const response = await axiosInstance.post('/auth/login', data);
//         if (response.status === 201) {
//             console.log('Login successful:', response.data);
//             setAuthUser(response.data);
//             toast.success(response.data.message || "Login successful" , {
//             duration: 3000,
//             position: 'top-center', 
//             });
//             return true;
//         }
//         else{
//             toast.error(response.data.message || 'Something went wrong', {
//                 duration: 3000,
//                 position: 'top-center', 
//             });
//             return false;
//         }

//     //   connectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoggingIn(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await axiosInstance.post("/auth/logout");
//       setAuthUser(null);
//       toast.success(response.data.message);
//       return true;
//     //   disconnectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Logout failed");
//       return false;
//     }
//   };

//   const updateProfile = async (data) => {
//     setIsUpdatingProfile(true);
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       setAuthUser(res.data);
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("Error in update profile:", error);
//       toast.error(error.response?.data?.message || "Profile update failed");
//     } finally {
//       setIsUpdatingProfile(false);
//     }
//   };

//   // Socket Functions
//   const connectSocket = () => {
//     if (!authUser || socket?.connected) return;

//     const newSocket = io(BASE_URL, {
//       query: { userId: authUser._id },
//     });
//     newSocket.connect();

//     setSocket(newSocket);

//     newSocket.on("getOnlineUsers", (userIds) => {
//       setOnlineUsers(userIds);
//     });
//   };

//   const disconnectSocket = () => {
//     if (socket?.connected) socket.disconnect();
//   };

//   return (
//     <ContextDef.Provider
//       value={{
//         authUser,
//         isSigningUp,
//         isLoggingIn,
//         isUpdatingProfile,
//         isCheckingAuth,
//         onlineUsers,
//         socket,
//         middlePage,
//         chatName,
//         yourName,
//         messages,
//         userMessages,
//         setMiddlePage,
//         setChatName,
//         setYourName,
//         setMessages,
//         setUserMessages,
//         checkAuth,
//         signup,
//         login,
//         logout,
//         updateProfile,
//         connectSocket,
//         disconnectSocket,
//       }}
//     >
//       {props.children}
//     </ContextDef.Provider>
//   );
// };

// export default ContextProvider;

// // optional easy way to use it
// export const useAuthContext = () => useContext(ContextDef);


import { createContext, useCallback, useContext, useState } from "react";
import { axiosInstance } from "../../lib/axios";

import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";





export const ContextDef = createContext();

const ContextProvider = (props) => {


  const [authUser, setAuthUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const [middlePage, setMiddlePage] = useState("chats");
  const [chatName, setChatName] = useState(null);
  const [yourName, setYourName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  // Chat Store additions
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");


  // console.log("selectedUser : ",selectedUser);

  const getUsers = async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsUsersLoading(false);
    }
  };

  const getMessages = async (userId) => {
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setIsMessagesLoading(false);
    }
  };

  const sendMessage = async (messageData) => {
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  

  const subscribeToMessages = () => {
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
    }
  };

  // Auth Functions
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
      // console.log(res.data)
      connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // const checkAuth = useCallback(async () => {
  //   try {
  //     const res = await axiosInstance.get("/auth/check");
  //     setAuthUser(res.data);
  //     connectSocket();  // Be careful: connectSocket shouldn't cause re-renders either
  //   } catch (error) {
  //     console.log("Error in checkAuth:", error);
  //     setAuthUser(null);
  //   } finally {
  //     setIsCheckingAuth(false);
  //   }
  // }, []);
  

  const signup = async (data) => {
    setIsSigningUp(true);
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      console.log(response)
      if (response.status === 201) {
        console.log('Sign up successful:', response.data);
        setAuthUser(response.data);
        toast.success(response.data.message || "Sign up successful", {
          duration: 3000,
          position: 'top-center',
        });
        connectSocket()
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data) => {
    setIsLoggingIn(true);
    try {
      const response = await axiosInstance.post('/auth/login', data);
      if (response.status === 201) {
        console.log('Login successful:', response.data);
        setAuthUser(response.data);
        toast.success(response.data.message || "Login successful", {
          duration: 3000,
          position: 'top-center',
        });
        connectSocket();
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      setAuthUser(null);
      toast.success(response.data.message);
      disconnectSocket();
     
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
     
    }
  };

  const updateProfile = async (data) => {
    setIsUpdatingProfile(true);
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      setAuthUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setIsUpdatingProfile(false);
    }
  };



    // Socket Functions
    // const connectSocket = () => {
    //   if (!authUser || socket?.connected) return;
  
    //   const newSocket = io(BASE_URL, {
    //     query: { userId: authUser._id },
    //   });
    //   newSocket.connect();
  
    //   setSocket(newSocket);
  
    //   newSocket.on("getOnlineUsers", (userIds) => {
    //     setOnlineUsers(userIds);
    //   });





    // };
  
    // const disconnectSocket = () => {
    //   if (socket?.connected) socket.disconnect();
    // };
  
    ////




    const connectSocket = () => {
      if (!authUser || socket?.connected) return;
    
      const newSocket = io(BASE_URL, {
        query: { userId: authUser._id },
        withCredentials: true, 
      });  
    
    
      newSocket.connect();
      setSocket(newSocket);
                                  
      // Listen for online users
      newSocket.on("getOnlineUsers", (userIds) => {
        setOnlineUsers(userIds);
      });
    
      // 👇 Typing status received from the other user
      newSocket.on("show-typing", ({ senderId,receiverId }) => {
        
          if(receiverId==authUser?._id)
          {
            setTypingStatus(senderId)
          }
       
      });
    
      // newSocket.on("hide-typing", ({ senderId }) => {
      //   if (senderId === selectedUser._id) {
      //     setTypingStatus("");
      //   }
      // });
    };



    const disconnectSocket = () => {
      if (socket?.connected) socket.disconnect();
    };

  

  return (
    <ContextDef.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
        isUpdatingProfile,
        isCheckingAuth,
        onlineUsers,
        socket,
        middlePage,
        chatName,
        yourName,
        messages,
        userMessages,
        setMiddlePage,
        setChatName,
        setYourName,
        setMessages,
        setUserMessages,
        checkAuth,
        signup,
        login,
        logout,
        updateProfile,
        connectSocket,
        disconnectSocket,

        // Added chat-store related states and functions
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        typingStatus,
        onlineUsers, 
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
        subscribeToMessages,
        unsubscribeFromMessages,
        setTypingStatus,
        setOnlineUsers
        

      }}
    >
      {props.children}
    </ContextDef.Provider>
  );
};

export default ContextProvider;

// optional easy way to use it
export const useAuthContext = () => useContext(ContextDef);

