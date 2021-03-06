import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import ItemService from '../services/ItemService';
import { ItemCreateDto } from '../interfaces/item/ItemCreateDto';

/**
 *  @route POST /item
 *  @desc Create item
 *  @access Public
 */
const createItem = async (req: Request, res: Response) => {
  const reqImage: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];

  if (reqImage.length === 0) {
    return res.status(statusCode.BAD_REQUEST).send(
        util.fail(statusCode.BAD_REQUEST, message.NO_IMAGE_FILES)
    );
  }

  // middleware에서 하는 것이 더 좋아보여요
  let flag = true;

  const imageList = await Promise.all ( 
    reqImage.map((data: Express.MulterS3.File) => { 
      if (!(data.mimetype == 'image/png' || data.mimetype == 'image/jpg' || data.mimetype == 'image/jpeg' || data.mimetype == 'image/heic')) {
        flag = false;
      }
      return data.location
    })
  );

  if (!flag) {
    return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.WRONG_FILE_FORMAT));
  }

  const itemCreateDto: ItemCreateDto = {
    title: req.body.title,
    contents: req.body.contents,
    price: req.body.price,
    imageList: imageList
  }

  try {
    await ItemService.createItem(itemCreateDto);

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