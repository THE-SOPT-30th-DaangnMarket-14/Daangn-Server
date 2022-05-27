import Item from "../models/Item";
import Chat from "../models/Chat";
import Like from "../models/Like";
import { ItemCreateDto } from '../interfaces/item/ItemCreateDto';
import { ItemResponseDto } from '../interfaces/item/ItemResponseDto';
import dayjs from "dayjs";

const createItem = async(itemCreateDto: ItemCreateDto) => {
  try {
    // TODO: - save하는거 .. promise all로 한번에 해보자
    const chat = new Chat();
    await chat.save();

    const like = new Like();
    await like.save();

    // TODO: - item 접근을 한번으로 줄여보자
    // Hint: - const newObject = { ...itemCreateDto, likeId: ~, chatId: ~ }
    const item = new Item(itemCreateDto);

    await item.save();

    const updatedItem = {
      likeId: like._id,
      chatId: chat._id,
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

    // TODO: - 최근 작성된 글 순서대로 정렬하기
    
        const items = await Item.find().populate("likeId chatId");

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
            else if (
              now.diff(createdAt, "d") < 31 &&
              now.diff(createdAt, "M") === 0
            )
              timeDiffString = String(now.diff(createdAt, "d")) + " 일 전";
            // 올린 시간이 일년 이내인 경우
            else if (now.diff(createdAt, "M") < 12)
              timeDiffString = String(now.diff(createdAt, "M")) + " 달 전";
            // 올린 시간이 일년 이상인 경우
            else timeDiffString = String(now.diff(createdAt, "y")) + " 년 전";

            const result = {
              title: item.title,
              location: item.location,
              price: item.price,
              image: item.imageList[0],
              likeCount: item.likeId.count,
              chatCount: item.chatId.count,
              timeBefore: timeDiffString,
            };

            return result;
          })
        );

        return data;

  } catch(error) {
    console.log(error);
    throw error;
  }
}

export default {
  createItem,
  readItem
}