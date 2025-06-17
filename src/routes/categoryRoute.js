import express from "express";
import {
  createNewCategory,
  getALLCategoryController,
} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create-new-cateogry", createNewCategory);
categoryRouter.get("/", getALLCategoryController);

export default categoryRouter;
