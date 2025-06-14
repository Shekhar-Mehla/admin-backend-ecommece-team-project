import express from "express";
import { addProductController } from "../controllers/productController.js";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/addProduct", addProductController);
router.post("/addCategory", createCategory);
router.post("/getCategories", getAllCategories);

export default router;
