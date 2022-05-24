import Item from "../models/Item";
import Chat from "../models/Chat";
import Like from "../models/Like";
import { ItemCreateDto } from '../interfaces/item/ItemCreateDto';
import { ItemResponseDto } from '../interfaces/item/ItemResponseDto';

const createItem = async(itemCreateDto: ItemCreateDto, imageList: string[]) => {
  try {

    const chat = new Chat();
    await chat.save();

    const like = new Like();
    await like.save();

    const item = new Item(itemCreateDto);
    await item.save();

    const updatedItem = {
      likeId: like._id,
      chatId: chat._id,
      imageList: imageList
    };
    await Item.findByIdAndUpdate(item._id, updatedItem);
    await item.save();

  } catch(error) {
    console.log(error);
    throw error;
  }
}

const readItem = async() => {
  try {
    // const item = await Item.find();
    const item = await Item.findById("628bc2711bf0d707eb12237d");
    const chatCount = await Chat.findById(item?.chatId).populate('_id', { count: 1 });
    console.log(chatCount);
    console.log(item);
  } catch(error) {
    console.log(error);
    throw error;
  }
}

export default {
  createItem,
  readItem
}