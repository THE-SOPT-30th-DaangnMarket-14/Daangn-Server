import { Router } from "express";
import ItemController from "../controllers/ItemController";
import upload from "../middleware/upload";

const router: Router = Router();

router.post('/', upload.array('image', 10), ItemController.createItem);
router.get('/', ItemController.readItem);

export default router;