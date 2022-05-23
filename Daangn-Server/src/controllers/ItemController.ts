import { Request, Response } from "express";   

import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";
import message from "../modules/responseMessage";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { ItemService } from "../services";

const createItemPost = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const itemCreateDto : ItemCreateDto = req.body;
    console.log(itemCreateDto);
    try{
       
        const data: PostBaseResponseDto = await ItemService.createItemPost(itemCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.ITEM_CREATE_SUCCESS, data));
    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default {
    createItemPost,
}
