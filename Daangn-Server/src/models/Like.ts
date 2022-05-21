import mongoose from "mongoose"
import { LikeInfo } from "../interfaces/like/LikeInfo"

const LikeSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  }
});

export default mongoose.model<LikeInfo&mongoose.Document>("Like", LikeSchema);