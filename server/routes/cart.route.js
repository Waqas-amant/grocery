import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controler.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get("/", auth, getCart);
cartRouter.post("/add", auth, addToCart);
cartRouter.put("/update", auth, updateCartQuantity);
cartRouter.delete("/remove/:productId", auth, removeFromCart);

export default cartRouter;
