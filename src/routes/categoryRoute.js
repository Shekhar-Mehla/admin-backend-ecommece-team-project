import express from "express";

import {
  createNewCategory,
  getAllCategories,
  updateCategoryController,
} from "../controllers/categoryController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);
categoryRouter.get("/getallCategory", getAllCategories);
categoryRouter.patch("/updateCategory", updateCategoryController);

export default categoryRouter;
