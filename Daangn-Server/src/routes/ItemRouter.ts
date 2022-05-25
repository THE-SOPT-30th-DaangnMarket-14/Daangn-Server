import { Router } from "express";
import { ItemController } from "../controllers";

const router: Router = Router();

router.post("/", ItemController.createItem);

export default router;