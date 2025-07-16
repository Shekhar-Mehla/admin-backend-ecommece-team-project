import express from "express";
import {
  addProductController,
  getAllProducts,
} from "../controllers/productController.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/addProduct", addProductController);
router.get("/allProducts", getAllProducts);
router.post("/category/add", createCategory);
router.get("/category/tree", getAllCategories);
router.put("/category/update/:id", updateCategory);
router.delete("/category/delete/:id", deleteCategory);

export default router;
