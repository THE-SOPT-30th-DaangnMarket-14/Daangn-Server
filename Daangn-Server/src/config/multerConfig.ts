import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import storage from './s3Config';
import multerS3 from 'multer-s3';
import config from '.';

type FileNameCallback = (error: Error | null, filename: string) => void;

export const multerConfig = {
  storage: multerS3 ({
    s3: storage,
    bucket: config.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const datetime = moment().format('YYYYMMDDHHmmss');
      cb(null, datetime + "_" + file.originalname);
    },
  })
}
