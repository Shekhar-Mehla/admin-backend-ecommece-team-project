import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import fs from "fs";
import cloudnaryConfig from "../../config/cloudnaryConfig1.js";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // check if directory is already availble if not create one
//     const imageFolder = path.join(path.resolve(), "public", "images");

//     if (!fs.existsSync(imageFolder)) {
//       fs.mkdirSync(imageFolder, { recursive: true });
//     }

//     cb(null, "public/images");

//   },
//   filename: function (req, file, cb) {
//     const random = uuidv4();
//     cb(null, random + "-" + file.originalname);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
// const fileFilter = (req, file, cb) => {
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted

//   try {
//     const acceptedFiles = [
//       "jpg",
//       "jpeg",
//       "png",
//       "webp",
//       "gif",
//       "bmp",
//       "tif",
//       "tiff",
//       "svg",
//     ];
//     const allowedExtensions = [
//       ".jpg",
//       ".jpeg",
//       ".png",
//       ".webp",
//       ".gif",
//       ".bmp",
//       ".tif",
//       ".tiff",
//       ".svg",
//     ];
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (
//       acceptedFiles.includes(file.mimetype.split("/")[1]) &&
//       allowedExtensions.includes(ext)
//     ) {
//       return cb(null, true);
//     }

//     cb("new Error('Only .jpg, .jpeg, .png, .webp files are allowed') ", false);
//   } catch (error) {
//     console.log(error);
//   }
//   // To reject this file pass `false`, like so:
//   // cb(null, false);

//   // // To accept the file pass `true`, like so:
//   // cb(null, true);

//   // // You can always pass an error if something goes wrong:
//   // cb(new Error("I don't have a clue!"));
// };

export const upload = multer({ storage });
