import slugify from "slugify";
import { getAllCategory } from "../models/Category/categoryModel.js";
import { addNewCategory } from "../models/Category/categoryModel.js";
import { getCategoryPath } from "../utility/categoryPath.js";
import responseClient from "../utility/responseClient.js";
import buildCategoryTree from "../utils/buildCategoryTree.js";
// controllers/categoryController.js

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
      ? responseClient({ res, message: "New Category Added Sucessfully" })
      : responseClient({
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

//this is for getting all categories
export const getAllCategories = async (req, res, next) => {
  try {
<<<<<<< Updated upstream
    const categories = await getAllCategory().lean();
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
=======
    const categories = await Category.find().lean();

    const nestedCategories = buildCategoryTree(categories);
    res.status(200).json({ success: true, data: nestedCategories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
>>>>>>> Stashed changes
  }
};
