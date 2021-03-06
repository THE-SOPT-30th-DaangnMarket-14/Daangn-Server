import mongoose from "mongoose"
import { LikeInfo } from "../interfaces/like/LikeInfo"

const LikeSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
},{
  versionKey: false
});

export default mongoose.model<LikeInfo&mongoose.Document>("Like", LikeSchema);