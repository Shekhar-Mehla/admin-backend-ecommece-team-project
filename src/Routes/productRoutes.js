import express from "express";
import { addProductController } from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post("/addProduct", addProductController);

export default productRouter;
