import { Router } from "express";
import {
  getDashboardStats,
  getSalesStats,
  getUserStats,
} from "../controllers/dashboard.controler.js";
import auth from "../middlewares/auth.js";

const dashboardRouter = Router();

dashboardRouter.get("/stats", auth, getDashboardStats);
dashboardRouter.get("/sales", auth, getSalesStats);
dashboardRouter.get("/users", auth, getUserStats);

export default dashboardRouter;
