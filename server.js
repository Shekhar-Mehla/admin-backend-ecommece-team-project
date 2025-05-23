import express from "express";
import connection from "./src/config/dbConfig.js";
import path from "path";
import cors from "cors";
import { userRouter } from "./src/routes/userRoute.js";
import { imageRouter } from "./src/routes/imageRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

// db connecttion
connection()
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose
    instance. */
    app.listen(PORT, (error) => {
      return !error
        ? console.log(`server is running at http://localhost:${PORT}`)
        : console.log(error);
    });
  })
  .catch((error) => console.log(error));

const __dirname = path.resolve();

// middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.send("<h2>Api is up</h2>"));
// image upload api for cloudnary
app.use("/api/vi/image", imageRouter);

app.use("/api/v1/user", userRouter);
