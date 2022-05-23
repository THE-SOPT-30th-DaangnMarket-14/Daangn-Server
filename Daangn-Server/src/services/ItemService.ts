import Item from "../models/Item";
import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";


const createItemPost = async (itemCreateDto: ItemCreateDto) => {
    try {
        const item = new Item({
            title: itemCreateDto.title,
            location: itemCreateDto.location,
            price:itemCreateDto.price,
            image_list: itemCreateDto.image_list,
            content: itemCreateDto.content,
            created_at: itemCreateDto.created_at
        });

        await item.save();

        const data = {
            _id: item._id
        }   

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default {
    createItemPost,
}
