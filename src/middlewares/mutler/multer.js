import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // check if directory is already availble if not create one
    const imageFolder = path.join(path.resolve(), "public", "images");
    if (!fs.existsSync(imageFolder)) {
      console.log("dhdhdhh");
      fs.mkdirSync(imageFolder, { recursive: true });
    }

    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
