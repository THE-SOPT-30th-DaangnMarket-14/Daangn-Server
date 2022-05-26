import multer from "multer";
import storage from "../config/s3Config"
import { multerConfig } from "../config/multerConfig";
import multerS3 from 'multer-s3';
import config from "../config";
import aws from 'aws-sdk';

const upload = multer(multerConfig);
// const upload = multer();

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

export default upload;