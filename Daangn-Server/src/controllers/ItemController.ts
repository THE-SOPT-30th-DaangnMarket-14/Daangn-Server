import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import ItemService from '../services/ItemService';
import { ItemCreateDto } from '../interfaces/item/ItemCreateDto';
import { AnyArray } from 'mongoose';

/**
 *  @route POST /item
 *  @desc Create item
 *  @access Public
 */
const createItem = async (req: Request, res: Response) => {
  const itemCreateDto: ItemCreateDto = req.body;
  const reqImage: any = req.files
  const imageList: string[] = []
  reqImage.forEach( (image: any) => {
    imageList.push(image.path);
  });

  try {
    await ItemService.createItem(itemCreateDto, imageList);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.CREATED,
          message.CREATE_ITEM_SUCCESS
        ));
  } catch(error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        ));
  }
}

/**
 *  @route GET /item
 *  @desc Read item
 *  @access Public
 */
const readItem = async(req: Request, res: Response) => {
  try {
    const data = await ItemService.readItem();
    res
      .status(statusCode.OK)
      .send(util.success(
        statusCode.OK,
        message.READ_ITEM_SUCCESS,
        data
      ));
  } catch(error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
}

export default {
  createItem,
  readItem
}