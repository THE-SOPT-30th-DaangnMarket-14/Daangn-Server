import mongoose from 'mongoose';
import { ItemInfo } from '../interfaces/item/ItemInfo';

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image_list: {
    type: Array,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date
  }
});

export default mongoose.model<ItemInfo & mongoose.Document>("Item", ItemSchema);