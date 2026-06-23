import { Router } from "express";

import auth from "../middlewares/auth.js";

import upload from "../middlewares/multer.js";
import {
  addHomeSlide,
  deleteSlide,
  getHomeSlide,
  getSlide,
  removeImageFromCloudry,
  updateSlide,
  uploadImages,
} from "../controllers/homeSlider.controler.js";

const homeSliderRouter = Router();
homeSliderRouter.post(
  "/uploadImages",

  auth,
  upload.array("images"),
  uploadImages,
);

homeSliderRouter.delete("/deleteImage", auth, removeImageFromCloudry);
homeSliderRouter.post("/add", auth, addHomeSlide);
homeSliderRouter.get("/", getHomeSlide);
homeSliderRouter.delete("/:id", auth, deleteSlide);
homeSliderRouter.put("/:id", auth, updateSlide);
homeSliderRouter.get("/:id", getSlide);
export default homeSliderRouter;
