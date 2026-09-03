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
import dashboardRouter from "./routes/dashboard.route.js";
const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:3000,http://localhost:3001,https://grocery-taupe-two.vercel.app,https://grocery-j8g880zrl-waqas-amants-projects.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Private-Network", "true");

  if (req.method === "OPTIONS") {
    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes("*") ||
      origin.endsWith(".vercel.app") ||
      /^https:\/\/.*\.vercel\.app$/.test(origin);

    if (isAllowed) {
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
      res.setHeader("Access-Control-Max-Age", "86400");
      return res.status(204).end();
    }
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      if (origin.endsWith(".vercel.app") || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
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
app.use("/api/admin/dashboard", dashboardRouter);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
