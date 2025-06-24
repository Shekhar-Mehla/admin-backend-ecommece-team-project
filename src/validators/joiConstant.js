import Joi from "joi";

export const SMALLSTRING = Joi.string().min(3).max(50);
export const SMALLSTRINGREQ = SMALLSTRING.required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAILREQ = EMAIL.required();
export const PHONE = Joi.string().pattern(/^\+[1-9]\d{1,14}$/);
export const PHONEREQ = PHONE.required();
export const THUMBNAIL = Joi.string().uri();
export const ADDRESS = Joi.object({
  street: SMALLSTRINGREQ,
  city: SMALLSTRINGREQ,
  state: Joi.string().min(2).max(20).required(),
  country: SMALLSTRINGREQ,
}).length(4);
export const ADDRESSREQ = ADDRESS.required();
export const PASSWORD = Joi.string().pattern(
  new RegExp("^[a-zA-Z0-9!@$%^&*()]{6,30}$")
);
export const PASSWORDREQ = PASSWORD.required();
export const CONFIRMPASSWORD = Joi.ref("PASSWORDREQ");

export const STATUS = Joi.string().valid("active", "inActive");
export const STATUSREW = STATUS.required();
export const TITLE = Joi.string().trim().min(3).max(100).required();
export const PRICE = Joi.number().precision(2).min(0).required();
export const DISCOUNT_PRICE = Joi.number()
  .precision(2)
  .min(0)
  .less(Joi.ref("price"))
  .optional();
export const IMAGES = Joi.array().items(Joi.string().uri()).min(1).required();

export const CATEGORY_ID = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();

export const STOCK = Joi.number().integer().min(0).required();
export const SIZES = Joi.array()
  .items(Joi.string().regex(/^\d+$/))
  .min(1)
  .required();
export const COLORS = Joi.array().items(Joi.string().trim()).min(1).required();
export const BRAND = Joi.string().trim().required();
export const PRODUCTSTATUS = Joi.string()
  .valid("active", "inactive", "archived")
  .required();
export const TAGS = Joi.array().items(Joi.string().trim()).optional();
export const REVIEWS = Joi.array().optional();
