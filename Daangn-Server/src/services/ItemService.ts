import fs from "fs";

import config from "../config";
import storage from "../config/s3Config";

import Chat from "../models/Chat";
import Item from "../models/Item";
import Like from "../models/Like";

import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";





const createItemPost = async (reqImage: Express.Multer.File, itemCreateDto: ItemCreateDto): Promise<PostBaseResponseDto> => {
    try {

        const fileContent: Buffer = fs.readFileSync(reqImage.path);

        const params: {
            Bucket: string;
            Key: string;
            Body: Buffer;
        } = {
            Bucket: config.bucketName,
            Key: reqImage.originalname,
            Body: fileContent
        };

        const result = await storage.upload(params).promise();

        const chat = new Chat({
            count: Math.floor(Math.random()*101)
        });

        await chat.save();

        const like = new Like({
            count: Math.floor(Math.random()*101)
        });

        await like.save();

        const item = new Item({
            title: itemCreateDto.title,
            price: itemCreateDto.price,
            imageList: reqImage,
            contents: itemCreateDto.contents,

            //이미지 업로드
            link: result.Location,
            fileName: reqImage.originalname
        });

        await item.save();

        const data = {
            _id: item._id,
            link: result.Location 
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
