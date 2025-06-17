import slugify from "slugify";

import {
  addNewCategory,
  getAllCategory,
} from "../models/Category/categoryModel.js";
import responseClient from "../utility/responseClient.js";
import { getCategoryPath } from "../utility/categoryPath.js";
export const createNewCategory = async (req, res, next) => {
  try {
    const category = req.body;
    console.log(req.body, "......");
    const { path, level } = await getCategoryPath({
      name: category.name,
      parentId: category.parent === "" ? null : category.parent,
    });
    const obj = {
      ...category,
      slug: slugify(category.name, { lower: true }),
      path,
      level,
    };
    const cat = await addNewCategory(obj);
    cat?._id
      ? responseClient({ req, res, message: "New Category Added Sucessfully" })
      : responseClient({
          req,
          res,
          message: "unable to add New Category",
          statusCode: 401,
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "this category is already available.Try next 😊";
    }
    next(error);
  }
};
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
