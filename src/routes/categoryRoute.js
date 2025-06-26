import express from "express";

import {
  createNewCategory,
  updateCategoryController,
} from "../controllers/categoryController.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);
categoryRouter.patch("/updateCategory", updateCategoryController);

export default categoryRouter;
