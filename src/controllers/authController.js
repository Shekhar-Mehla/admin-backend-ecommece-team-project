import {
  createNewSession,
  deleteSession,
} from "../models/Session/sessionModel.js";
import { addNewUser, updateUser } from "../models/User/userModel.js";
import {
  accountActivatedNotificationEmail,
  accountActivationLinkEmail,
} from "../services/email/emailService.js";
import { hashPassword } from "../utility/bcrypt.js";
import { v4 as uuidv4, validate } from "uuid";
import responseClient from "../utility/responseClient.js";

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

// varify user controller start here

export const verifyUser = async (req, res, next) => {
  try {
    const { _id, token } = req.body;
    if (_id && token) {
      // validate token if it is valid uuid token using uuid validate
      const validToken = validate(token);
      if (validToken) {
        // make the delete querry to the session using both _id and token
        const deletedSession = await deleteSession({ _id, token });
        if (deletedSession?._id) {
          // update the user status to active using email from deletedsession
          const fliter = {
            email: deletedSession.association,
          };
          const update = {
            status: "active",
          };
          const updatedUser = await updateUser(fliter, update);
          if (updatedUser?._id) {
            // send email notification to the client about account activation.
            const name = updatedUser.fName;
            const email = updatedUser.email;
            const url = "http://localhost:5173/login";

            const mail = await accountActivatedNotificationEmail({
              name,
              email,
              url,
            });
            console.log(mail, ".........");
            if (mail?.messageId) {
              return responseClient({
                req,
                res,
                message: "Account has been activated and user also notified",
              });
            }
          }
        }
      }
      return responseClient({
        req,
        res,
        statusCode: "token is invalid",
        statusCode: 400,
      });
    }
    return responseClient({
      req,
      res,
      statusCode: 400,
      message: "you must submit _id and token",
    });
  } catch (error) {
    next(error);
  }
};

// varify user controller end her
