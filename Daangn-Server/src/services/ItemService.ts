import Item from "../models/Item";
import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";


const createItemPost = async (itemCreateDto: ItemCreateDto) => {
    try {
        const item = new Item({
            title: itemCreateDto.title,
            price: itemCreateDto.price,
            imageList: itemCreateDto.imageList,
            contents: itemCreateDto.contents,
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
