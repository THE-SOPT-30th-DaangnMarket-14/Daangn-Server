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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const Chat_1 = __importDefault(require("../models/Chat"));
const Item_1 = __importDefault(require("../models/Item"));
const Like_1 = __importDefault(require("../models/Like"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongoURI); // 연결
        mongoose_1.default.set("autoCreate", true); // 서버 실행 시 Collection 자동 생성
        console.log("Mongoose Connected ...");
        Item_1.default.createCollection().then(function (collection) {
            console.log("Item created");
        });
        Like_1.default.createCollection().then(function (collection) {
            console.log("Like created");
        });
        Chat_1.default.createCollection().then(function (collection) {
            console.log("Chat created");
        });
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map