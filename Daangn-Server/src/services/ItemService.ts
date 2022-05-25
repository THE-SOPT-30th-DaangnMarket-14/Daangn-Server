import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";
import Item from "../models/Item";

const createItem = async (itemCreateDto: ItemCreateDto): Promise<PostBaseResponseDto> => {
    try {
        // TODO: likeId, chatId 여기서 설정해줘야 할 듯
        const likeArray: string[] = ['1234'];
        const likeId =  likeArray[Math.floor(Math.random() * likeArray.length)];
        const chatArray: string[] = ['4321'];
        const chatId =  chatArray[Math.floor(Math.random() * chatArray.length)];
        
        const locationArray: string[] = ['서현동', '신도림동'];
        const location =  locationArray[Math.floor(Math.random() * locationArray.length)];

        const item = new Item({
            likeId: likeId,
            chatId: chatId,
            title: itemCreateDto.title,
            location: location,
            price: itemCreateDto.price,
            imageList: itemCreateDto.imageList,
            contents: itemCreateDto.contents
        });

        await item.save();

        const data = {
            _id: item.id
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createItem,
};