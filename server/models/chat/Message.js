const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      default: null,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      default: null,
    },
    senderUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String
    },



  },
  { timestamps: true }
)
module.exports = mongoose.model("message", MessageSchema)