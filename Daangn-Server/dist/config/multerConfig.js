"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const s3Config_1 = __importDefault(require("./s3Config"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const _1 = __importDefault(require("."));
const dayjs_1 = __importDefault(require("dayjs"));
exports.multerConfig = {
    storage: (0, multer_s3_1.default)({
        s3: s3Config_1.default,
        bucket: _1.default.bucketName,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            const datetime = (0, dayjs_1.default)().format('YYYYMMDDHHmmss');
            cb(null, datetime + "_" + file.originalname);
        },
    })
};
//# sourceMappingURL=multerConfig.js.map