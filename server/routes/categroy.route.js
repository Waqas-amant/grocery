import { Router } from "express";

import {
  createCategroy,
  deleteCategroy,
  getCategories,
  getCategroy,
  removeImageFromCloudry,
  updateCategroy,
  uploadImages,
} from "../controllers/categroy.controler.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
const categroyRouter = Router();
categroyRouter.post("/uploadImages", upload.array("images"), uploadImages);
categroyRouter.delete("/deleteImage", auth, removeImageFromCloudry);
categroyRouter.post("/add", auth, createCategroy);
categroyRouter.get("/", getCategories);
categroyRouter.delete("/:id", auth, deleteCategroy);
categroyRouter.put("/:id", auth, updateCategroy);
categroyRouter.get("/:id", getCategroy);
export default categroyRouter;
