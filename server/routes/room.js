const express = require('express');
const router = express.Router();
const Room = require('../models/chat/roomSchema');
const User = require('../models/user/userModel');

// Create a new room
router.post('/createRoom', async (req, res) => {
  try {
    const { roomName, roomPicture, roomAdmin, participants, activeRoom } = req.body;
    const newRoom = new Room({
      roomName,
      roomPicture,
      roomAdmin,
      participants,
      activeRoom,
    });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Get all active rooms
router.get("/getActiveRooms", async (req, res) => {
  try {
    // Find all rooms where activeRoom is true
    const activeRooms = await Room.find({ activeRoom: true });

    res.status(200).json(activeRooms);
  } catch (error) {
    console.error("Error fetching active rooms:", error);
    res.status(500).json({ error: "Failed to fetch active rooms" });
  }
});





// Get all rooms
router.get('/getAllRooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});








// Get a room by ID
router.get('/getRoomById/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ error: 'Failed to fetch room by ID' });
  }
});

// Update a room by ID
router.put('/updateRoom/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const updateData = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
});

// Delete a room by ID
router.delete('/deleteRoom/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

module.exports = router;
