import express from "express";
import { registerNewUser } from "../controllers/userController.js";
import {} from "multer";
import { upload } from "../middlewares/mutler/multer.js";
export const userRouter = express.Router();

// register new user route
userRouter.post("/register",  registerNewUser);
