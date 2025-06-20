import express from "express";
import { upload } from "../middlewares/mutler/multer.js";
import imageController from "../controllers/imageController.js";

export const imageRouter = express.Router();

imageRouter.post("/", upload.array("profilePicture"), imageController);
