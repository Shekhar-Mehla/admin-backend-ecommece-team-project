import express from "express";

import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addCategory", authMiddleware, createNewCategory);
router.get("/getallCategory", authMiddleware, getAllCategories);
router.patch("/updateCategory/:id", authMiddleware, updateCategoryController);
router.delete("/delete/:id", authMiddleware, deleteCategory);

export default router;
