"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//router index file
const express_1 = require("express");
const ItemRouter_1 = __importDefault(require("./ItemRouter"));
const router = (0, express_1.Router)();
router.use("/item", ItemRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map