import express from "express";
import {
  createNewCategory,
  getALLCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create-new-cateogry", createNewCategory);
categoryRouter.get("/", getALLCategoryController);
categoryRouter.patch("/updateCategory", updateCategoryController);

export default categoryRouter;
