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
import { updateProductsCategoryPath } from "../models/Product/productModel.js";
import buildCategoryTree from "../utility/buildCategoryTree.js";
export const createNewCategory = async (req, res, next) => {
  try {
    const category = req.body;


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
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategory();



    if (categories.length && Array.isArray(categories)) {
      const nestedCategories = buildCategoryTree(categories);
      return responseClient({
        res,
        message: "here is the list of all categories",
        payload: nestedCategories,
      });
    } else {
      responseClient({
        res,
        statusCode: 400,
        message: "something went wrong could not create categpry",
      });
    }
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

      const updateObj = { name, path, slug: newslug };
      const updatedCategory = await updateCategory({ _id }, updateObj);
      if (updatedCategory?._id) {
        // update the children
        const updatedChildrens = await updateChildrenCategories(oldPath, path);
        if (updatedChildrens?.modifiedCount > 0) {
          const updatedProdtcsWithCategoryPath =
            await updateProductsCategoryPath(oldPath, path);

          if (updatedProdtcsWithCategoryPath?.modifiedCount > 0) {
            return responseClient({
              message: "updated the category successfully",
              res,
            });
          } else {
            responseClient({
              message: `categrory has been updated but there is no product under this categry`,
              res,
            });
          }
        }
      }
    }
    return responseClient({
      res,
      message: "something went wrong could not update category",
      statusCode: 400,
    });
  } catch (error) {
    next(error);
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  const { _id } = req.params;
  try {
    //Find the categories whose parent field equals the current category’s _id
    const childCategories = await Category.find({ parent: _id });
    //If a category has children, deletion of category should not be done.
    if (childCategories.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete a category which has sub-categories" });
    }

    //If a category has products, it should not be deleted.
    const products = await Product.find({ categoryId: _id });
    if (products.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete a category which has products" });
    }

    const deletedCategory = await Category.findByIdAndDelete(_id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Could not find category" });
    }
    return res.status(200).json(deletedCategory);
  } catch (error) {
    return res
      .staus(500)
      .json({ message: "Server Error", error: error.message });
  }
};
