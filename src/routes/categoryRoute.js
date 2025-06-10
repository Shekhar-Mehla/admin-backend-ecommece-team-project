import express from "express";
import { createNewCategory } from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create-new-cateogry", createNewCategory);

export default categoryRouter;
