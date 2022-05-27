"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerConfig_1 = require("../config/multerConfig");
const upload = (0, multer_1.default)(multerConfig_1.multerConfig);
// const s3: aws.S3 = new aws.S3({
//   accessKeyId: config.s3AccessKey,
//   secretAccessKey: config.s3SecretKey,
// });
// const upload = multer({
//   storage: multerS3 ({
//     s3: s3,
//     bucket: config.bucketName,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "public-read",
//     key: (req, file, cb) => {
//       console.log(file);
//       cb(null, file.originalname);
//     }
//   })
// });
exports.default = upload;
//# sourceMappingURL=upload.js.map