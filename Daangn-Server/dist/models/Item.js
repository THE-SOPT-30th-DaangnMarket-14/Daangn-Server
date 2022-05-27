"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    imageList: {
        type: Array,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    likeId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Like"
    },
    chatId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model("Item", ItemSchema);
//# sourceMappingURL=Item.js.map