import mongoose, { mongo } from 'mongoose';
import { ItemInfo } from '../interfaces/item/ItemInfo';

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    //required: true
  }, 
  location: {
    type: String
  },
  price: {
    type: Number,
    //required: true
  },
  imageList: {
    type: Array,
    required: true
  },
  contents: {
    type: String,
    //required: true
  },
  likeId: {
    type: mongoose.Types.ObjectId,
    ref: "Like"
  },
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat"
  },

  //이미지 파일
  link: {
    type: String,
    required: true
  },
  likeId: {
    type: mongoose.Types.ObjectId,
    ref: "Like"
  },
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat"
  }
},{
  timestamps: true,
  versionKey: false
});

export default mongoose.model<ItemInfo & mongoose.Document>("Item", ItemSchema);
