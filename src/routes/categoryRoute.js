import express from "express";

import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryController,
} from "../controllers/categoryController.js";
export const categoryRouter = express.Router();
//All category routes
categoryRouter.post("/addCategory", createNewCategory);
categoryRouter.get("/getallCategory", getAllCategories);
categoryRouter.patch("/updateCategory", updateCategoryController);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
