import { Router } from "express";
import { getAllOrders, updateOrderStatus, deleteOrder, getUserOrders } from "../controllers/order.controler.js";
import auth from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.get("/getAllOrders", auth, getAllOrders);
orderRouter.get("/user", auth, getUserOrders);
orderRouter.put("/updateOrderStatus/:id", auth, updateOrderStatus);
orderRouter.delete("/:id", auth, deleteOrder);

export default orderRouter;
