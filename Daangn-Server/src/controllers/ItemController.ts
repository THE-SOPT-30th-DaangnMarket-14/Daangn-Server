import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { ItemService } from "../services";
import { ItemCreateDto } from "../interfaces/item/ItemCreateDto";

/**
 *  @route POST /item
 *  @desc Create Item
 *  @access Public
 */
const createItem = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const itemCreateDto: ItemCreateDto = req.body;

    try {
        const data = await ItemService.createItem(itemCreateDto);
        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_ITEM_SUCCESS, data)
        );
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

export default {
    createItem,
};
