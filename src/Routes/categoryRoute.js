import express from "express";

import { createNewCategory } from "../controllers/categoryController.js";
export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createNewCategory);

export default categoryRouter;
