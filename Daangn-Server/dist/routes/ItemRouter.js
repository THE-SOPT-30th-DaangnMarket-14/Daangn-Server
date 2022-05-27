"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController_1 = __importDefault(require("../controllers/ItemController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
// router.post('/', upload.fields([{ name: "image", maxCount: 10 }]), ItemController.createItem);
router.post('/', upload_1.default.array("image", 10), ItemController_1.default.createItem);
router.get('/', ItemController_1.default.readItem);
exports.default = router;
//# sourceMappingURL=ItemRouter.js.map