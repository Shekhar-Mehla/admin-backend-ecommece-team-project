import joiValidation from "../../middlewares/joiValidation.js";
import {
  ADDRESS,
  EMAILREQ,
  PASSWORDREQ,
  PHONE,
  SMALLSTRINGREQ,
  THUMBNAIL,
} from "../joiConstant.js";

const registerUserValidtion = (req, res, next) => {
  const obj = {
    fName: SMALLSTRINGREQ,
    lName: SMALLSTRINGREQ,
    email: EMAILREQ,
    phone: PHONE,
    address: ADDRESS,
    password: PASSWORDREQ,

    profilePicture: THUMBNAIL,
  };

  joiValidation({ req, res, next, obj });
};

export default registerUserValidtion;
