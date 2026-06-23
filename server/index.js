import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import connectDb from "./connectDb.js";
import userRouter from "./routes/user.route.js";
import homeSliderRouter from "./routes/homeSlider.route.js";
import categroyRouter from "./routes/categroy.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import cartRouter from "./routes/cart.route.js";
import bannerRouter from "./routes/banner.route.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
  });
});

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRouter);
app.use("/api/homeSlider", homeSliderRouter);
app.use("/api/categroy", categroyRouter);
app.use("/api/product", productRouter);
app.get("/api/test-route", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/banner", bannerRouter);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
