import express from "express";
import { upload } from "../middlewares/mutler/multer.js";
export const imageRouter = express.Router();

imageRouter.post("/", upload.array("profilePicture", 5), (req, res, next) => {
  // steps to follow 
});
