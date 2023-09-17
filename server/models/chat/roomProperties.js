const mongoose=require('mongoose')
const roomPropertiesSchema=mongoose.Schema({
coverImage:String,
title:String,
subTitle:String,
backgroundRoom:String,
})

module.exports=mongoose.model(RoomProperties,roomPropertiesSchema)


