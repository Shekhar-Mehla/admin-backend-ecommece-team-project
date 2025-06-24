import express from "express";
import {
  addProductController,
  getProductsByCategoryIdController,
  getProductByIdController,
  getAllProductsController,
  updateProductsController,
  deleteProductsController,
} from "../controllers/productController.js";
import addProductJoiValidator from "../validators/schemas/addProductJoiValidator.js";
const productRouter = express.Router();

productRouter.post("/addProduct",addProductJoiValidator, addProductController);
productRouter.get("/:categoryId", getProductsByCategoryIdController);
productRouter.get("/Id/:_id", getProductByIdController);
productRouter.get("/", getAllProductsController);
productRouter.patch("/:_id", updateProductsController);
productRouter.delete("/deleteProducts", deleteProductsController);

export default productRouter;
