const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
 
  roomName:String,
  roomPicture:String,
  roomAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  activeRoom:Boolean

});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
