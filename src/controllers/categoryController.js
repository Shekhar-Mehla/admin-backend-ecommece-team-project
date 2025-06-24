import slugify from "slugify";

import {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  updateChildrenCategories,
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

export const updateCategoryController = async (req, res, next) => {
  try {
    // step 1 get data from req.body
    const { _id, name } = req.body;

    // step 2 fetch csategry by id from db
    const category = await getCategoryById(_id);

    if (category?._id) {
      const { parent } = category;
      const oldPath = category.path;

      const newslug = slugify(name, { lower: true });
      const { path } = await getCategoryPath({
        name: name,
        parentId: parent === "" ? null : parent,
      });
      // update category

      const updateObj = { name: name, path: path, slug: newslug };
      const updatedCategory = await updateCategory({ _id }, updateObj);
      if (updatedCategory?._id) {
        // fetch all its children with old path
        // const allCategories = await getAllCategory();
        // const children = allCategories.filter((cat) =>
        //   cat.path.startsWith(oldPath + `/`)
        // );
const filter = {path:oldPath + "/"}

const newpath = 

const update = {$set:{path:}}


       const updatedChildrens = updateChildrenCategories(filter,update)

        //
        // const allChildrens = await getAllCategory({})
      }
    }
  } catch (error) {
    next(error);
  }
};
