import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId } from "../config/socket.io.js";
import {io }from "../config/socket.io.js"

export const getAllUsers = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getAllUsers ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getMessagesBetweenTwoUsersByIds = async(req,res)=>{
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessagesBetweenTwo controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessageBetweenTwo = async (req, res) => {

    console.log(req)

    try {
      
      console.log("helo")

      const { text,image} = req.body;
     
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      if(!text && !image)
      {
        return res.status(400).json({ message: "Message is required" });
      }

      let imageUrl;
      if (image) {
        
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessageBetweenTwo controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

