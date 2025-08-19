import Joi from "joi";

export const SMALLSTRING = Joi.string().min(3).max(50);
export const SMALLSTRINGREQ = SMALLSTRING.required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAILREQ = EMAIL.required();
export const PHONE = Joi.number();
export const PHONEREQ = PHONE.required();
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
export const THUMBNAIL = Joi.string().uri({ scheme: ["https"] });

export const ROLE = Joi.string().valid("admin", "user");
export const STATUS = Joi.string().valid("active", "inActive");
export const STATUSREW = STATUS.required();
