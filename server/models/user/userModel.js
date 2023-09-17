const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: String,
  },  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  ActiveUser:{
    type: Boolean,default:false,
    
  }

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);