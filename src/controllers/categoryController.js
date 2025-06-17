import Category from "../models/Category/categoryModel.js";
import buildCategoryTree from "../utils/buildCategoryTree.js";
// controllers/categoryController.js

export const createCategory = async (req, res) => {
  try {
    const { name, slug, parent } = req.body;

    // Default for root categories
    let level = 1;
    let path = `/${slug}`;

    if (parent) {
      const parentCategory = await Category.findById(parent);

      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent category",
        });
      }

      if (typeof parentCategory.level !== "number") {
        return res.status(400).json({
          success: false,
          message: "Parent category's level is invalid",
        });
      }

      level = parentCategory.level + 1;
      path = `${parentCategory.path}/${slug}`;
    }

    const newCategory = new Category({
      name,
      slug,
      parent: parent || null,
      path,
      level,
    });

    await newCategory.save();

    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("Category Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

//this is for getting all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const nestedCategories = buildCategoryTree(categories);
    res.status(200).json({ success: true, data: nestedCategories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};
