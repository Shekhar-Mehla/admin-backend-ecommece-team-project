import slugify from "slugify";

import {
  addNewCategiry,
  getCategoryByParent,
} from "../models/Category/categoryModel.js";
import responseClient from "../utility/responseClient.js";
export const createNewCategory = async (req, res, next) => {
  try {
    const { name, parent } = req.body;

    // 1️⃣ Validate required input
    if (!name) {
      return responseClient({
        res,
        message: "Category name is required",
        statusCode: 400,
      });
    }

    // 2️⃣ Generate slug from name (e.g., "Men Shoes" -> "men-shoes")
    const slug = slugify(name, { lower: true });

    // Default values for root-level categories
    let path = "/" + slug;
    let level = 1;

    // 3️⃣ Check if this is a sub-category (i.e., has a parent)
    let parentCategory = null;

    if (parent) {
      parentCategory = await getCategoryByParent(parent);

      // ⚠️ If parent is provided but not found, throw error
      if (!parentCategory) {
        return responseClient({
          res,
          message: "Parent category not found",
          statusCode: 404,
        });
      }

      // 4️⃣ Build path and level based on parent
      path = `${parentCategory.path}/${slug}`;
      level = parentCategory.level + 1;
    }

    // 5️⃣ Build category object to save
    const categoryData = {
      name,
      slug,
      parent: parent || null,
      path,
      level,
    };

    // 6️⃣ Save new category to database
    const newCategory = await addNewCategiry(categoryData);

    // 7️⃣ Handle creation failure
    if (!newCategory?._id) {
      return responseClient({
        res,
        message: "Something went wrong. Could not create the category.",
        statusCode: 500,
      });
    }

    // 8️⃣ Respond with success
    return responseClient({
      res,
      message: parentCategory
        ? "Created a new sub-category"
        : "Created a new main category",
      payload: newCategory,
    });
  } catch (error) {
    // 9️⃣ Handle duplicate slug error
    if (
      error.message.includes("E11000 duplicate key error") ||
      error.code === 11000
    ) {
      error.message = "Category with this name or slug already exists";
    }

    // 🔟 Pass any error to global error handler
    next(error);
  }
};
