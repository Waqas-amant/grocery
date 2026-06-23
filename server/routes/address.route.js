import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controler.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddress);
addressRouter.get("/", auth, getAddresses);
addressRouter.put("/:id", auth, updateAddress);
addressRouter.delete("/:id", auth, deleteAddress);

export default addressRouter;
