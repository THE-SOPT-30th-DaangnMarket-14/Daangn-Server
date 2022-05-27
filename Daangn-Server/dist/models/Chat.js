"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema = new mongoose_1.default.Schema({
    count: {
        type: Number,
        default: 0
    },
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model("Chat", ChatSchema);
//# sourceMappingURL=Chat.js.map