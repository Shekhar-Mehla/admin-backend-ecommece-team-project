import slugify from "slugify";

import {
 
  getAllCategory,
  getCategoryById,
 
} from "../models/Category/categoryModel.js";
import responseClient from "../utility/responseClient.js";
import { getCategoryPath } from "../utility/categoryPath.js";
import { updateProductsCategoryPath } from "../models/Product/productModel.js";

export const getALLCategoryController = async (req, res, next) => {
  try {
    const allCategories = await getAllCategory();
    allCategories?.length
      ? responseClient({
          res,
          message: "here is all category",
          payload: allCategories,
        })
      : responseClient({
          res,
          statusCode: 400,
          message: "something went wrong unable to get data",
        });
  } catch (error) {
    next(error);
  }
};
