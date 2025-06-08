import express from "express";
import { addProductController } from "../controllers/productController.js";
import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";
import {
  addSubcategory,
  getSubcategoriesByCategory,
} from "../controllers/subCategories.js";

const router = express.Router();
router.post("/addProduct", addProductController);
router.post("/addCategory", addCategory);
router.get("/getCategories", getCategories);
router.post("/addSubCategory", addSubcategory);
router.get("/getSubCategories/:categoryId", getSubcategoriesByCategory);
export default router;
