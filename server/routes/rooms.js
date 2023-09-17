const express = require('express');
const router = express.Router();
const Message = require('../models/chat/Message');
const Room = require('../models/chat/roomSchema'); // If you need to associate messages with rooms
const User = require('../models/user/userModel');

// Create a new message
router.post('/createMessage', async (req, res) => {
  try {
    const { roomId, conversationId, senderUser, content } = req.body;
    const newMessage = new Message({
      roomId,
      conversationId,
      senderUser,
      content,
    });
    const savedMessage = await newMessage.save();
    
    // If you want to associate the message with a room, you can do it here
    // Example: Add the message to the room's messages array
    if (roomId) {
      const room = await Room.findById(roomId);
      if (room) {
        room.messages.push(savedMessage._id);
        await room.save();
      }
    }
    
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Get all messages
router.get('/getAllMessages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get a message by ID
router.get('/getMessageById/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching message by ID:', error);
    res.status(500).json({ error: 'Failed to fetch message by ID' });
  }
});



// Update a message by ID
router.put('/updateMessage/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const updateData = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(messageId, updateData, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete a message by ID
router.delete('/deleteMessage/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // If you want to remove the message from a room, you can do it here
    // Example: Remove the message ID from the room's messages array
    if (deletedMessage.roomId) {
      const room = await Room.findById(deletedMessage.roomId);
      if (room) {
        room.messages.pull(deletedMessage._id);
        await room.save();
      }
    }
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

router.get('/getAllMessagesByRoom/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    
    // Find all messages where roomId matches the provided room ID
    const messages = await Message.find({ roomId });
    
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages by room ID:', error);
    res.status(500).json({ error: 'Failed to fetch messages by room ID' });
  }
});

module.exports = router;
