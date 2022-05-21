import mongoose from "mongoose";
import { ChatInfo } from '../interfaces/chat/ChatInfo';

const ChatSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<ChatInfo & mongoose.Document>("Chat", ChatSchema);
