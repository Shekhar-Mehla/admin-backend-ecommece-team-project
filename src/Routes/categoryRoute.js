import express from "express";

import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryController,
} from "../controllers/categoryController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);
categoryRouter.get("/getallCategory", getAllCategories);
categoryRouter.patch("/updateCategory", updateCategoryController);
categoryRouter.delete("/delete/id", deleteCategory);

export default categoryRouter;
