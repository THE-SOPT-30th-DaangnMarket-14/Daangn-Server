import { Request, Response } from "express";   

import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";
import { ItemService } from "../services";
import message from "../modules/responseMessage";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import statusCode from "../modules/statusCode";
import util from "../modules/util";


/**
 *  @route POST /item
 *  @desc Create Item
 *  @access Public
 */
const createItemPost = async (req: Request, res: Response) => {
    const itemCreateDto : ItemCreateDto = req.body;
    if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    
    const reqImage: Express.Multer.File = req.file;

    try{
       
        const data = await ItemService.createItemPost(reqImage, itemCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.ITEM_CREATE_SUCCESS, data));
    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createItemPost,
}
