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

let socketIds = [];
let messages = [];

Array.prototype.remove = function(value) {
  let index = this.indexOf(value);
  if (index !== -1) {
      this.splice(index, 1);
  }
};



io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);


  socket.emit("new_user",socket.id)

  socket.on("get_user_id", () => {
    socket.emit("new_user", socket.id);
  });

  socketIds.push(socket.id);

  console.log(socketIds);

  socket.on("receive_users", () => {
    io.emit("allUsers", socketIds);
  });

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
  socket.on("sendPrivateMessage", ({ chatName, inputValue }) => {

    console.log(`${chatName} ::: ${inputValue}`)

    io.to(chatName).emit("receivePrivateMessage", [socket.id,
      inputValue,chatName
    ]);
  });

  // // Handle room joining
  // socket.on("joinRoom", (room) => {

  //   console.log(`user is joined in room ${room} : sid : ${socket.id}`)
  //   socket.join(room);
  //   socket.to(room).emit("receiveMessage", `${socket.id} joined ${room}`);
  // });


  // socket.on("send_message", ({ room, message }) => {
  //   io.to(room).emit("receiveMessage", message);
  // });



  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete onlineUsers[socket.id];

    socketIds.remove(socket.id);

    io.emit("allUsers", socketIds);

    io.emit("onlineUsers", Object.values(onlineUsers));
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));

