import express from "express";
import { upload } from "../middlewares/mutler/multer.js";
import { Error } from "mongoose";
export const imageRouter = express.Router();

imageRouter.post("/", upload.array("profilePicture", 5), (req, res, next) => {
  // steps to follow
  // 1. get req.file
  // 2. upload image to the cloudnary
  // 3.after you get url then delete the file from your server and send image url to client
  try {
    throw new Error("error is happen");
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});
