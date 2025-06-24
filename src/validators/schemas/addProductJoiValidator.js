import joiValidation from "../../middlewares/joiValidation.js";
import {
  BRAND,
  CATEGORY_ID,
  COLORS,
  DISCOUNT_PRICE,
  IMAGES,
  PRICE,
  SIZES,
  STATUS,
  STOCK,
  TAGS,
  TITLE,
} from "../joiConstant.js";

export const addProductJoiValidator = (req, res, next) => {
  const obj = {
    title: TITLE,
    price: PRICE,
    discountPrice: DISCOUNT_PRICE,
    images: IMAGES,

    categoryId: CATEGORY_ID,

    stock: STOCK,
    sizes: SIZES,
    colors: COLORS,
    brand: BRAND,
    status: STATUS,
    tags: TAGS,
  };
  return joiValidation({ req, res, next, obj });
};

export default addProductJoiValidator;
