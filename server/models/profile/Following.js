const mongoose=require("mongoose")
const followingsSchema = new mongoose.Schema({
 Name: String,
  picture: String,


  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
});
module.exports = mongoose.model('Following', followingsSchema);