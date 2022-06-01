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
const Item_1 = __importDefault(require("../models/Item"));
const Chat_1 = __importDefault(require("../models/Chat"));
const Like_1 = __importDefault(require("../models/Like"));
const dayjs_1 = __importDefault(require("dayjs"));
const createItem = (itemCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: - save하는거 .. promise all로 한번에 해보자
        const chat = new Chat_1.default();
        yield chat.save();
        const like = new Like_1.default();
        yield like.save();
        // TODO: - item 접근을 한번으로 줄여보자
        // Hint: - const newObject = { ...itemCreateDto, likeId: ~, chatId: ~ }
        const item = new Item_1.default(itemCreateDto);
        yield item.save();
        const updatedItem = {
            likeId: like._id,
            chatId: chat._id,
        };
        yield Item_1.default.findByIdAndUpdate(item._id, updatedItem);
        yield item.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const readItem = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Item_1.default.find().sort('-createdAt').populate("likeId chatId");
        const data = yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            // 시간 차 구하기
            const createdAt = item.createdAt;
            const now = (0, dayjs_1.default)();
            let timeDiffString;
            // 올린 시간이 1시간 이내인 경우
            if (now.diff(createdAt, "m") < 60)
                timeDiffString = String(now.diff(createdAt, "m")) + "분 전";
            // 올린 시간이 하루 이내인 경우
            else if (now.diff(createdAt, "h") < 24)
                timeDiffString = String(now.diff(createdAt, "h")) + "시간 전";
            // 올린 시간이 한달 이내인 경우
            else if (now.diff(createdAt, "d") < 31 &&
                now.diff(createdAt, "M") === 0)
                timeDiffString = String(now.diff(createdAt, "d")) + "일 전";
            // 올린 시간이 일년 이내인 경우
            else if (now.diff(createdAt, "M") < 12)
                timeDiffString = String(now.diff(createdAt, "M")) + "달 전";
            // 올린 시간이 일년 이상인 경우
            else
                timeDiffString = String(now.diff(createdAt, "y")) + "년 전";
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
        })));
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createItem,
    readItem
};
//# sourceMappingURL=ItemService.js.map