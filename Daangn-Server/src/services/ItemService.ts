import dayjs from "dayjs";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";
import { ItemResponseDto } from "../interfaces/item/ItemResponseDto";
import Item from "../models/Item";
import Like from "../models/Like";
import Chat from "../models/Chat";

const createItem = async (imageStringList: string[], itemCreateDto: ItemCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const like = new Like({ 
            count: Math.floor(Math.random() * 101)
        })
        await like.save();

        const chat = new Chat({ 
            count: Math.floor(Math.random() * 101)
        })
        await chat.save();
        
        const locationArray: string[] = ['서현동', '신도림동'];
        const location =  locationArray[Math.floor(Math.random() * locationArray.length)];

        const item = new Item({
            likeId: like._id,
            chatId: chat._id,
            title: itemCreateDto.title,
            location: location,
            price: itemCreateDto.price,
            imageList: imageStringList,
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

const getItems = async() => {
    try {
        const items = await Item.find().populate(
            "likeId", "count"
        ).populate(
            "chatId", "count"
        );
        console.log(items);

        const data = await Promise.all(
            items.map(async (item: any) => {
                // 시간 차 구하기
                const createdAt = item.createdAt;
                const now = dayjs();
                let timeDiffString: string;
                
                // 올린 시간이 1시간 이내인 경우
                if (now.diff(createdAt, "m") < 60) 
                    timeDiffString = String(now.diff(createdAt, "m")) + " 분 전";
                // 올린 시간이 하루 이내인 경우
                else if (now.diff(createdAt, "h") < 24)
                    timeDiffString = String(now.diff(createdAt, "h")) + " 시간 전";
                // 올린 시간이 한달 이내인 경우
                else if (now.diff(createdAt, "d") < 31 && now.diff(createdAt, "M") === 0)
                    timeDiffString = String(now.diff(createdAt, "d")) + " 일 전";
                // 올린 시간이 일년 이내인 경우
                else if (now.diff(createdAt, "M") < 12)
                    timeDiffString = String(now.diff(createdAt, "M")) + " 달 전";
                // 올린 시간이 일년 이상인 경우
                else
                    timeDiffString = String(now.diff(createdAt, "y")) + " 년 전";

                const result = {
                    title: item.title,
                    location: item.location,
                    price: item.price,
                    image: item.imageList[0],
                    likeCount: item.likeId.count,
                    chatCount: item.chatId.count,
                    timeBefore: timeDiffString
                };

                return result;
            })
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createItem,
    getItems,
};