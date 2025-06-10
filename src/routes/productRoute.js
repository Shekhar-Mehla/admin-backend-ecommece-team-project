import express from "express";
import {
  createNewProduct,
  getproducta,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post("/create-new-product", createNewProduct);
productRouter.get("/by-category/:slug", getproducta);

export default productRouter;
