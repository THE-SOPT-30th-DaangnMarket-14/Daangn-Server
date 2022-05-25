import mongoose from "mongoose";
import { ChatInfo } from '../interfaces/chat/ChatInfo';

const ChatSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
},{
  versionKey: false
});

export default mongoose.model<ChatInfo & mongoose.Document>("Chat", ChatSchema);
