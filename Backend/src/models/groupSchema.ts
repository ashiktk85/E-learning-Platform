import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  courseId: { type: String, required: true }, 
  deleted : {type : Boolean, default : false}
});

const groupSchema = new mongoose.Schema({
  courseId: {
    type: String, 
    required: true,
  },
  messages: [messageSchema], 
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model('Group', groupSchema );


export default Group ;
