// controllers/categoryController.js
import Category from "../models/Category/categoryModel.js";

// Create a new category
export const addCategory = async (req, res) => {
  try {
    const { name, slug, isFeatured } = req.body;

    const newCategory = new Category({ name, slug, isFeatured });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created", category: newCategory });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create category", error: err.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
