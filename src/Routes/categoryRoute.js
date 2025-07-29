import express from "express";

import {
  createNewCategory,

  getALLCategoryController,
  updateCategoryController,

} from "../controllers/categoryController.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);

categoryRouter.get("/", getALLCategoryController);
categoryRouter.patch("/updateCategory", updateCategoryController);


export default categoryRouter;
