import express from "express";
import { upload } from "../middlewares/mutler/multer.js";

export const imageRouter = express.Router();
import cloudinary from "cloudinary";
import path from "path";
import { imageController } from "../controllers/imageController.js";

imageRouter.post("/", upload.single("profilePicture"), imageController);
