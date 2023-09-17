const { v4: uuidV4 } = require("uuid");
const Room = require("../../models/chat/roomSchema");
const jwt = require('jsonwebtoken');

// Define your secret key here or retrieve it from a secure configuration
const secretKey = "your-secret-key"; // Replace with your actual secret key

const roomHandler = (socket, io) => { // Pass 'io' as a parameter

  const createRoom = async () => {
    const roomId = uuidV4();
    
    try {
      const newRoom = new Room({ roomId, participants: [] });
      await newRoom.save();
  
      socket.emit("room-created", { roomId });
      console.log("Created room:", roomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoom = async ({ roomId, peerId, token }) => { // Include 'token' parameter
    
    console.log("Joining roomId", roomId, "with peerId", peerId);
    try {
      const decodedToken = jwt.verify(token, secretKey);
      const room = await Room.findOne({ roomId });
      if (room) {
        room.participants.push(peerId);
        await room.save();
  
        socket.join(roomId);
        socket.to(roomId).emit('user-join', { peerId });
        socket.emit("get-users", {
          roomId,
          participants: room.participants,
        });
      } else {
        console.log("Room not found:", roomId);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const leaveRoom = async ({ roomId, peerId }) => {
    console.log("Leaving roomId", roomId, "with peerId", peerId);
    try {
      const room = await Room.findOne({ roomId });
      if (room) {
        room.participants = room.participants.filter(id => id !== peerId);
        await room.save();

        socket.leave(roomId);
        socket.emit("get-users", {
          roomId,
          participants: room.participants,
        });
      } else {
        console.log("Room not found:", roomId);
      }
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };
  

  const chatMessage = ({ roomId, message, decodedToken }) => { // Include 'decodedToken' parameter
    const data = {
      sender: decodedToken.username,
      message: message,
    };
    io.to(roomId).emit('message', data);
  };

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });


  

  socket.on("create-room", createRoom); // Listen for "create-room" event
  socket.on("join-room", joinRoom); // Listen for "join-room" event
  socket.on("chatMessage", chatMessage); // Listen for "chatMessage" event
  socket.on("leave-room", leaveRoom); // Listen for "leave-room" event
};

module.exports = roomHandler;
