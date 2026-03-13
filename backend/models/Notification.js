const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

student:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

title:String,

message:String,

roundName:String,
roundDate:String,
roundTime:String,
instructions:String,

read:{
type:Boolean,
default:false
}

},{timestamps:true});

module.exports = mongoose.model("Notification",notificationSchema);