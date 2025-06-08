import joi from "joi";
import responseClient from "../utility/responseClient.js";

const joiValidation = ({ req, res, next, obj }) => {
  try {
    let schema;
    Array.isArray(req.body)
      ? (schema = joi.array().items(joi.object(obj)))
      : (schema = joi.object(obj));
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    }
    responseClient({ req, res, message: error.message, statusCode: 400 });
  } catch (error) {
    next(error);
  }
};

export default joiValidation;
