import joiValidation from "../../middlewares/joiValidation.js";
import {
 
  IDREQ,
 
  TOKENREQ,
} from "../joiConstant.js";

const verifyUserValidtion = (req, res, next) => {
  const obj = {
    token: TOKENREQ,
    _id: IDREQ,
  };

  joiValidation({ req, res, next, obj });
};

export default verifyUserValidtion;
