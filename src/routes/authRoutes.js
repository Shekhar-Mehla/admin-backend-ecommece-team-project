import express from "express";
import { registerNewUser, verifyUser } from "../controllers/authController.js";
import registerUserValidtion from "../validators/schemas/registerUserValidtion.js";
import verifyUserValidtion from "../validators/schemas/vaerifyUserValidation.js";

export const authRouter = express.Router();

// register new user route
authRouter.post("/register", registerUserValidtion, registerNewUser);
authRouter.patch("/varify-user", verifyUserValidtion, verifyUser);
