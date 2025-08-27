import express from "express";
import connection from "./src/config/dbConfig.js";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import "dotenv/config";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import authRouter from "./src/routes/authRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import imageRouter from "./src/routes/imageRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import couponRouter from "./src/routes/couponRoutes.js";

const app = express();
const PORT = process.env.PORT || 8001;

//middlewares
app.use(
  cors({
    origin: process.env.ROOT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// get the current directory name
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("<h2>Api is up</h2>"));

//Routers
app.use("/api/v1/image", imageRouter); // image upload api for cloudnary
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/coupon", couponRouter);

// connect MongoDB
connection()
  .then(() => {
    app.listen(PORT, "0.0.0.0", (error) => {
      return !error
        ? console.log(`server is running at http://localhost:${PORT}`)
        : console.log(error);
    });
  })
  .catch((error) => console.log(error));

// global error handler make sure to keep these middleware at the very bottom
// page not found error
app.use((req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
// global error hadler middleware
app.use(errorMiddleware);
