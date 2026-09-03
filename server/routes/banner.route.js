import { Router } from "express";
import {
  addBanner,
  deleteBanner,
  getAllBanners,
  listActiveBanners,
} from "../controllers/banner.controler.js";
import auth from "../middlewares/auth.js";

const bannerRouter = Router();

bannerRouter.get("/active", listActiveBanners);
bannerRouter.get("/all", getAllBanners);
bannerRouter.get("/", getAllBanners);
bannerRouter.post("/create", auth, addBanner);
bannerRouter.delete("/:id", auth, deleteBanner);

export default bannerRouter;
