"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const ItemService_1 = __importDefault(require("../services/ItemService"));
/**
 *  @route POST /item
 *  @desc Create item
 *  @access Public
 */
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqImage = req.files;
    if (reqImage.length === 0) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NO_IMAGE_FILES));
    }
    // middleware에서 하는 것이 더 좋아보여요
    let flag = true;
    const imageList = yield Promise.all(reqImage.map((data) => {
        if (data.mimetype != 'image/png') {
            flag = false;
        }
        return data.location;
    }));
    if (!flag) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.WRONG_FILE_FORMAT));
    }
    const itemCreateDto = {
        title: req.body.title,
        contents: req.body.contents,
        price: req.body.price,
        imageList: imageList
    };
    try {
        yield ItemService_1.default.createItem(itemCreateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_ITEM_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 *  @route GET /item
 *  @desc Read item
 *  @access Public
 */
const readItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ItemService_1.default.readItem();
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_ITEM_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createItem,
    readItem
};
//# sourceMappingURL=ItemController.js.map