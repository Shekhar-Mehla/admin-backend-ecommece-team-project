import joiValidation from "../../middlewares/joiValidation.js";
import {
  ADDRESS,
  EMAILREQ,
  PASSWORDREQ,
  PHONE,
  ROLE,
  SMALLSTRINGREQ,
  STATUS,
  THUMBNAIL,
} from "../joiConstant.js";

// register new user validation
const registerUserValidtion = (req, res, next) => {
  const obj = {
    fName: SMALLSTRINGREQ,
    lName: SMALLSTRINGREQ,
    email: EMAILREQ,
    role: ROLE,
    status: STATUS,
    phone: PHONE,
    address: ADDRESS,
    password: PASSWORDREQ,

    profilePicture: THUMBNAIL,
  };

  joiValidation({ req, res, next, obj });
};

//login validation
const loginValidation = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
    password: PASSWORDREQ,
  };

  joiValidation({ req, res, next, obj });
};
//email validation
const emailValidation = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
  };
  joiValidation({ req, res, next, obj });
};

//password change validation
const changePassword = (req, res, next) => {
  const obj = {
    password: PASSWORDREQ,
  };
  joiValidation({ req, res, next, obj });
};

export {
  registerUserValidtion,
  loginValidation,
  changePassword,
  emailValidation,
};
