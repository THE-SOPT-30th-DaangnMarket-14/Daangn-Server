import { Request } from "express";
import AWS from "aws-sdk";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import config from "../config/index";

type FileNameCallback = (error: Error | null, filename: string) => void;

export const s3: AWS.S3 = new AWS.S3({
    accessKeyId: config.s3AccessKey,
    secretAccessKey: config.s3SecretKey,
    region: "ap-northeast-2",
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read-write",
        bucket: config.bucketName,
        key: (
            req: Request,
            file: Express.Multer.File,
            callback: FileNameCallback
        ): void => {
            callback(null, file.originalname);
        }
    })
});