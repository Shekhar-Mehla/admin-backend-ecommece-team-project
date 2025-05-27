import cloudinary from "cloudinary";
import path from "path";
import responseClient from "../utility/responseClient.js";
export const imageController = async (req, res, next) => {
  try {
    //  steps to follow
    // 1. get req.file
    if (Array.isArray(req.files)) {
      const paths = req.files.map((file) => {
        return file.path;
      });
      const productId = paths.map(async (path) => {
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          folder: "gropu_project",
        };
        try {
          const result = await cloudinary.uploader.upload(path, options);

          return responseClient({
            req,
            res,
            message: "image has uplaoded",
            payload: result,
          });
        } catch (error) {
          next(error);
        }
      });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        asset_folder: "my_images",
      });
      return responseClient({
        req,
        res,
        message: "image has uplaoded",
        payload: result,
      });
    }

    //
    // 2. upload image to the cloudnary
    // 3.after you get url then delete the file from your server and send image url to client
  } catch (error) {
    next(error);
  }
};
