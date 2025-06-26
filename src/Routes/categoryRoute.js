import express from "express";

import {
  createNewCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);
categoryRouter.get("/getallCategory", getAllCategories);

export default categoryRouter;
