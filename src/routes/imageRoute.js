// import express from "express";
// import { upload } from "../middlewares/mutler/multer.js";
// import imageController from "../controllers/imageController.js";

// export const imageRouter = express.Router();

// imageRouter.post("/", upload.array("profilePicture"), imageController);

import express from "express";
import multer from "multer";
import responseClient from "../utility/responseClient.js";
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../config/cloudnaryConfig.js";
const imageRouter = express.Router();

// Create an instance of multer storage
const upload = multer({ dest: "uploads/" });

// POST | upload a file | create
imageRouter.post("/", upload.array("images", 5), async (req, res, next) => {
  try {
    // Check if the file exists
    if (!req.file && (!req.files || req.files.length === 0)) {
      return responseClient({
        res,
        statusCode: 400,
        message: "No file provided",
      });
    }
    // Upload the file(s) to Cloudinary
    // If multiple files, upload all and return array of results
    let result;
    if (req.files && Array.isArray(req.files)) {
      result = await Promise.all(
        req.files.map((file) => uploadMediaToCloudinary(file.path))
      );
    } else {
      result = await uploadMediaToCloudinary(req.file.path);
    }
    return responseClient({
      res,
      payload: result,
      message: "file uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE | delete a file | delete
imageRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the id exists
    if (!id) {
      return responseClient({
        res,
        statusCode: 400,
        message: "No id provided",
      });
    }

    // Delete the file from Cloudinary
    const result = await deleteMediaFromCloudinary(id);
    if (result) {
      return responseClient({
        res,
        payload: {},
        message: "media removed successfully!!",
      });
    } else {
      return responseClient({
        res,
        statusCode: 400,
        message: "media not found or could not be deleted",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default imageRouter;
