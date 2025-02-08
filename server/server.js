// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("send_message", (data) => {
//     io.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected");
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });








const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST"]
  }
});

let onlineUsers = {}; // Track online users

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining with a username
  // Handle user joining
  socket.on("join", (username) => {
    onlineUsers[socket.id] = username;
    console.log("User joined:", username); // Debugging log
    console.log("Online users:", onlineUsers); // Debugging log
    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  // Handle public messages
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data); // Broadcast message to all clients
  });

  // Handle private messages (Direct Messages - DM)
  socket.on("sendPrivateMessage", ({ receiverId, message }) => {
    io.to(receiverId).emit("receivePrivateMessage", {
      sender: onlineUsers[socket.id],
      message,
    });
  });

  // Handle room joining
  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.to(room).emit("receiveMessage", `${onlineUsers[socket.id]} joined ${room}`);
  });

  // Handle messages inside a room
  socket.on("sendMessageToRoom", ({ room, message }) => {
    socket.to(room).emit("receiveMessage", message);
  });

  // Handle typing indicator
  socket.on("typing", (room) => {
    socket.to(room).emit("userTyping", onlineUsers[socket.id]);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete onlineUsers[socket.id];
    io.emit("onlineUsers", Object.values(onlineUsers));
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));

