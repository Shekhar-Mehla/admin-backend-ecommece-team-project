import {
  createNewSession,
  deleteSession,
} from "../models/Session/sessionModel.js";
import {
  addNewUser,
  findUserByEmail,
  findUserByGoogleId,
  updateUser,
} from "../models/User/userModel.js";
import { accountActivationLinkEmail } from "../services/email/emailService.js";
import { comparePassword, hashPassword } from "../utility/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import responseClient from "../utility/responseClient.js";
import { generateJWTs } from "../utility/jwthelper.js";
import { sendResetPasswordLinkEmail } from "../utility/nodemailerHelper.js";
import axios from "axios";
import { Children } from "react";
// register new user
export const registerNewUser = async (req, res, next) => {
  try {
    // steps to follow
    // 1. hash the password using bcrypt before saving to database

    if (req.body) {
      req.body.password = hashPassword(req.body.password);
      const newuser = await addNewUser(req.body);
      if (newuser?._id) {
        // 2.create token using uuid package

        const token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        const sessionObj = {
          token,
          association: newuser?.email,
          expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), //session will be expired in 1 year
        };
        // 3.save token into session collection
        const session = await createNewSession(sessionObj);
        if (session?._id) {
          // 4.create the url to send to cleint email to activate the account
          const ActivationLink = `${process.env.ROOT_URL}?id=${session._id}&t=${session.token}`;
          const name = newuser.fName;
          // 4.setup nodemailer and send activation link to user email.
          const email = await accountActivationLinkEmail({
            name,
            email: session?.association,
            url: ActivationLink,
          });
          if (email.messageId) {
            return responseClient({
              req,
              res,
              message:
                "we have sent the activation link to your email. please chack and click on the activation link to activate your account.",
            });
          }
        }
        return responseClient({
          req,
          res,
          message:
            "could not create the user. something went wrong try again later",
          statusCode: 500,
        });
      }
      return responseClient({
        req,
        res,
        message:
          "could not create the user. something went wrong try again later",
        statusCode: 500,
      });
    }
  } catch (error) {
    error.message.includes("E11000 duplicate key error")
      ? (error.message =
          "email already exist. click on forgot password to reset password ")
      : error.message;

    next(error);
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    //destructure email and password from req.body
    const { email, password } = req.body;

    // check if user exist
    const user = await findUserByEmail(email);

    // if user not found
    if (!user || !user._id) {
      return responseClient({
        res,
        message: "User not found. Please register to login!",
        statusCode: 404,
      });
    }

    // Compare password
    const isMatch = comparePassword(password, user.password);

    // if password match then generate token
    if (isMatch) {
      const jwt = await generateJWTs(user.email);
      return responseClient({
        res,
        message: "User logged in successfully!!",
        payload: jwt,
      });
    }

    // if password not match
    return responseClient({
      res,
      message: "Invalid credentials",
      statusCode: 401,
    });
  } catch (error) {
    console.log("Login error:", error);
    return responseClient({
      res,
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

//get the user
export const getUser = async (req, res) => {
  //retrieves and returns user information.
  try {
    responseClient({
      res,
      payload: req.userInfo, // from auth middleware
      message: "User fetched successfully",
    });
  } catch (error) {
    responseClient({ res, message: error.message, statusCode: 500 });
  }
};

// forget password
export const forgetPassword = async (req, res) => {
  try {
    //find if user exist
    const user = await findUserByEmail(req.body.email);

    // if user not found
    if (!user?._id) {
      return responseClient({
        res,
        message: "User not found",
        statusCode: 404,
      });
    }

    //if user found
    if (user?._id) {
      // if user is created send a verification email
      const secureID = uuidv4();

      // store this secure ID in session storage for that user
      const newUserSession = await createNewSession({
        token: secureID,
        association: user.email,
        expiry: new Date(Date.now() + 3 * 60 * 60 * 1000), //session will be expired in 3 hr
      });

      if (newUserSession?._id) {
        const resetPasswordUrl = `${process.env.ROOT_URL}/change-password?e=${user.email}&id=${secureID}`;

        //send mail via node mailer
        sendResetPasswordLinkEmail(user, resetPasswordUrl);
      }
    }

    // if user found
    user?._id
      ? responseClient({
          res,
          payload: {},
          message: "Check your inbox/spam to reset your password",
        })
      : responseClient({
          res,
          message: "Something went wrong",
          statusCode: 500,
        });
  } catch (error) {
    console.log(error.message);
    responseClient({ res, message: error.message, statusCode: 500 });
  }
};

// change password
export const changePassword = async (req, res) => {
  try {
    const { formData, token, email } = req.body;
    console.log("req.body", req.body);

    //check if user exists
    const user = await findUserByEmail(email);

    //delete token from session table after password reset for one time click
    const sessionToken = await deleteSession({ token, association: email });
    console.log("sessionToken", sessionToken);

    if (user && sessionToken) {
      const { password } = formData;
      const encryptPassword = hashPassword(password);
      const updatedPasword = await updateUser(
        { email },
        { password: encryptPassword }
      );
      responseClient({
        res,
        payload: updatedPasword,
        message: "Password Reset successfully!!",
      });
    } else {
      responseClient({
        res,
        message: "Token expired or invalid. Please try again",
        statusCode: 500,
      });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    responseClient({ res, message: error.message, statusCode: 500 });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    const { email } = req.body;
    const { authorization } = req.headers;

    // Remove session for the user
    const result = await deleteSession({
      token: authorization,
      association: email,
    });

    // Use ternary operator to handle success or failure
    result
      ? responseClient({
          res,
          payload: {},
          message: "User logged out successfully!!",
        })
      : responseClient({
          res,
          message: "Session not found or already deleted.",
          statusCode: 500,
        });
  } catch (error) {
    console.error("Error logging out:", error);
    responseClient({ res, message: error.message, statusCode: 500 });
  }
};

// google auth controller start here
// create url for the google consent screen.

export const googleAuthController = (req, res, next) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:8000/api/v1/auth/google/callback&response_type=code&scope=openid%20profile%20email`;
  res.redirect(url);
};
// google auth controller ends here
// google callback auth controller start here

export const googleAuthCallBackController = async (req, res, next) => {
  try {
    const { code } = req.query;
    const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:8000/api/v1/auth/google/callback",
      grant_type: "authorization_code",
    });
    const { id_token } = data;
    const userInfo = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64").toString()
    );
    console.log(userInfo);
    const user = await findUserByGoogleId(userInfo.sub);

    if (!user) {
      const obj = {
        providerId: userInfo.sub,
        fName: userInfo.given_name,
        lName: userInfo.family_name,
        email: userInfo.email,
        profilePicture: userInfo.picture,
        emailVerified: userInfo.email_verified,
      };
      const newuser = await addNewUser(obj);
      if (newuser?._id) {
        const jwts = await generateJWTs(newuser?.email);
        
        return responseClient({
          res,
          message: "you have loged in ",
          payload: jwts,
        });
      } else {
        return responseClient({
          message: "could not create the user",
          statusCode: 401,
          res,
        });
      }
    }
    const jwts = await generateJWTs(user.email);
  
    return responseClient({
      res,
      message: "you have loged in ",
      payload: jwts,
    });
  } catch (error) {
    next(error);
  }
};
// google callback auth controller ends here
