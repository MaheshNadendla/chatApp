import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true, // ✅ send cookies with request
});

export default socket;
