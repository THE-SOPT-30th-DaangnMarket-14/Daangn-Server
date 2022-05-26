import mongoose from "mongoose";

export interface ItemInfo {
  likeId?: mongoose.Types.ObjectId | string,
  chatId?: mongoose.Types.ObjectId | string,
  title: string,
  location?: string,
  price: number,
  imageList: string[],
  contents: string
}
