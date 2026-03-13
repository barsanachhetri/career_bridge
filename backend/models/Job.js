const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

companyName:{
type:String,
required:true
},

role:{
type:String,
required:true
},

tier:{
type:Number
},

description:{
type:String
},

jobDescriptionPdf:{
type:String
},

eligibleBranches:[
{
type:String
}
],



deadline:{
type:Date
}

},{timestamps:true});

module.exports = mongoose.model("Job",jobSchema);