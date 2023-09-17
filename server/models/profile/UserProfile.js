const mongoose=require("mongoose")
const userProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  address: String,
  phoneNumber: String,
  profilePicture: String,
  background:String,
  theme:String,
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('UserProfile', userProfileSchema);