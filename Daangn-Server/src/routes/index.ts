//router index file
import { Router } from "express";
import ItemRouter from "./ItemRouter";


const router: Router = Router();
router.use("/item", ItemRouter);

router.use("/item", ItemRouter);

export default router;
