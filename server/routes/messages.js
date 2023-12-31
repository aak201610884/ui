const router=require("express").Router()
const Message=require('../models/chat/Message')
//new conv
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      ConversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
    
  }
});
  
router.get('/',async(req,res)=>{
  try {
    const messages=await Message.find()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error)
    
  }
})

//get conv of a user

module.exports=router;