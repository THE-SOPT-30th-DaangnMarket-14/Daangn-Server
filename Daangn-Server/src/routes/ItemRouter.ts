import { Router } from "express";
import multer from "multer";

import { multerConfig } from "../config/multerConfig";

import { ItemController } from "../controllers";

const router: Router = Router();

const upload = multer(multerConfig);

router.post("/", upload.single('image'), ItemController.createItemPost);

export default router;
