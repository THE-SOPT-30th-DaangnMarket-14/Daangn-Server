import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import storage from './s3Config';
import multerS3 from 'multer-s3';
import config from '.';

type FileNameCallback = (error: Error | null, filename: string) => void;

// export const multerConfig = {
//   storage: multer.diskStorage({
//     filename: function (
//       req: Request,
//       file: Express.Multer.File,
//       cb: FileNameCallback
//     ) {
//       cb(null, file.originalname);
//     },
//   }),
// };

export const multerConfig = {
  storage: multerS3 ({
    s3: storage,
    bucket: config.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
}
