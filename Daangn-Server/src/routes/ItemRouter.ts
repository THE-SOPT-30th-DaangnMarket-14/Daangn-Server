import { Router } from "express";
import { ItemController } from "../controllers";
import { upload } from "../middleware/Multer";

const router: Router = Router();

router.post("/", upload.array('images', 10), ItemController.createItem);

export default router;