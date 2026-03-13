const Notification = require("../models/Notification");

exports.createNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.json(notification);
};

exports.getNotifications = async (req, res) => {
  try{

const notifications = await Notification.find({
student:req.user.id
}).sort({createdAt:-1});

res.json(notifications);

}catch(error){

res.status(500).json({message:error.message});

}

};
exports.markAsRead = async (req,res)=>{

try{

const notification = await Notification.findByIdAndUpdate(
req.params.id,
{read:true},
{new:true}
);

res.json(notification);

}catch(error){

res.status(500).json({message:error.message});

}

};