import multer from "multer";
import { multerConfig } from "../config/multerConfig";

const upload = multer(multerConfig);

export default upload;