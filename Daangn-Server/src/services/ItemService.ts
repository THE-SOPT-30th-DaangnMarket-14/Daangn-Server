import Item from "../models/Item";
import Chat from "../models/Chat";
import Like from "../models/Like";
import { ItemCreateDto } from '../interfaces/item/ItemCreateDto';
import { ItemResponseDto } from '../interfaces/item/ItemResponseDto';

const createItem = async(itemCreateDto: ItemCreateDto) => {
  try {

    const chat = new Chat();
    await chat.save();

    const like = new Like();
    await like.save();

    const item = new Item(itemCreateDto);
    await item.save();

    const updatedItem = {
      likeId: like._id,
      chatId: chat._id
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
    const itemList: ItemResponseDto[] = [];
    
    const itemFromDB = await Item.find();

    // TODO: - foreach말고 다른 비동기처리 해야댐
    itemFromDB.forEach( async item => {
      const like = await Like.findById(item.likeId).populate('_id');
      const chat = await Chat.findById(item.chatId).populate('_id');
      console.log(like?.count);
      console.log(chat?.count);
      const newItem: ItemResponseDto = {
        title: item.title,
        location: "언주역",
        price: item.price,
        image: item.imageList[0],
        likeCount: like?.count,
        chatCount: chat?.count
      }
      itemList.push(newItem);
      console.log(itemList);
    });

    return itemList;

  } catch(error) {
    console.log(error);
    throw error;
  }
}

export default {
  createItem,
  readItem
}