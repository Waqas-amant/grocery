import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { removeImageFromCloudry } from "../controllers/categroy.controler.js";
import {
  createProduct,
  deleteMultipleProducts,
  deleteProduct,
  featuredProduct,
  filterProducts,
  getAllProductByCatId,
  getAllProductByCatName,
  getAllProductByRating,
  getAllProducts,
  getAllProductsByPrice,
  getAllProductsCount,
  getProduct,
  searchProductControler,
  sortBy,
  submitProductRating,
  updateProduct,
  uploadImages,
} from "../controllers/product.controler.js";

const productRouter = Router();
productRouter.post("/uploadImages", upload.array("images"), uploadImages);
productRouter.post("/create", auth, createProduct);

productRouter.get("/getAllProducts", auth, getAllProducts);
productRouter.get("/getAllProductsByCatId/:id", auth, getAllProductByCatId);
productRouter.get("/getAllProductsByPrice", auth, getAllProductByCatName);
productRouter.get("/getAllProductsByPrice", auth, getAllProductsByPrice);
productRouter.post("/getAllProductsByRating", auth, getAllProductByRating);
productRouter.post("/getFeaturedProducts", auth, featuredProduct);
productRouter.get("/getAllProductsByCount", auth, getAllProductsCount);

productRouter.delete("/deleteMultiple", auth, deleteMultipleProducts);
productRouter.delete("/:id", auth, deleteProduct);
productRouter.get("/:id", auth, getProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudry);
productRouter.put("/updateProduct/:id", auth, updateProduct);

productRouter.post("/filter", auth, filterProducts);
productRouter.post("/filter", auth, sortBy);
productRouter.post("/filter", auth, searchProductControler);
productRouter.post("/rating", auth, submitProductRating);

export default productRouter;
