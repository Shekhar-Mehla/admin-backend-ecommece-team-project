import express from "express";
import { registerNewUser } from "../controllers/authController.js";
import registerUserValidtion from "../validators/schemas/registerUserValidtion.js";

export const authRouter = express.Router();

// register new user route
authRouter.post("/register", registerUserValidtion, registerNewUser);
