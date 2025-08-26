import express from "express";
import {
  addProductController,
  getProductsByCategoryIdController,
  getProductByIdController,
  getAllProductsController,
  updateProductsController,
  deleteProductsController,
} from "../controllers/productController.js";
<<<<<<< HEAD
import { authMiddleware } from "../middlewares/authMiddleware.js";
const productRouter = express.Router();

productRouter.post("/addProduct", authMiddleware, addProductController);
productRouter.get(
  "/:categoryId",
  authMiddleware,
  getProductsByCategoryIdController
);
productRouter.get("/Id/:_id", authMiddleware, getProductByIdController);
productRouter.get("/", authMiddleware, getAllProductsController);
productRouter.patch("/:_id", authMiddleware, updateProductsController);
productRouter.delete(
  "/deleteProducts/:id",
  authMiddleware,
  deleteProductsController
);
=======
import addProductJoiValidator from "../validators/schemas/addProductJoiValidator.js";
const productRouter = express.Router();

productRouter.post("/addProduct",addProductJoiValidator, addProductController);
productRouter.get("/:categoryId", getProductsByCategoryIdController);
productRouter.get("/Id/:_id", getProductByIdController);
productRouter.get("/", getAllProductsController);
productRouter.patch("/:_id", updateProductsController);
productRouter.delete("/deleteProducts", deleteProductsController);
>>>>>>> feature/social-auth

export default productRouter;
