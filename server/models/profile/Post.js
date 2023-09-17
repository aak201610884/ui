const mongoose=require("mongoose")
const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  images: [String],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
 
});
module.exports = mongoose.model('Post', postSchema);