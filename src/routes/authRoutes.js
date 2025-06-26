import express from "express";
import {
  changePassword,
  forgetPassword,
  getUser,
  loginUser,
  logout,
  registerNewUser,
} from "../controllers/authController.js";
import {
  registerUserValidtion,
  loginValidation,
} from "../validators/schemas/registerUserValidtion.js";
import { authMiddleware, refreshAuth } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

// register new user route
authRouter.post("/register", registerUserValidtion, registerNewUser);

//login user
authRouter.post("/login", loginValidation, loginUser);

//get the user-info
authRouter.get("/user-info", authMiddleware, getUser);

// GET NEW ACCESS TOKEN | GET | PRIVATE ROUTE
authRouter.get("/accessjwt", refreshAuth);

// forget password
authRouter.post("/forget-password", forgetPassword);

// reset password
authRouter.patch("/change-password", changePassword);

//logout
authRouter.post("/logout", logout);
