import { Router } from "express";
import {
  addBanner,
  listActiveBanners,
} from "../controllers/banner.controler.js";
import auth from "../middlewares/auth.js";

const bannerRouter = Router();

bannerRouter.get("/active", listActiveBanners);
bannerRouter.post("/create", auth, addBanner);

export default bannerRouter;
