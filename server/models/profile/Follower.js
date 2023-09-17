const mongoose=require("mongoose")
const followersSchema = new mongoose.Schema({
 Name: String,
  picture: String,

   
   profile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
});
module.exports = mongoose.model('Follower', followersSchema);