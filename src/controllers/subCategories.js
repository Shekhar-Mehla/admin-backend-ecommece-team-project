// controllers/subcategoryController.js
import Subcategory from "../models/Category/subCategoryModel.js";

// Create a new subcategory
export const addSubcategory = async (req, res) => {
  try {
    const { name, slug, parentCategory } = req.body;

    const newSubcategory = new Subcategory({ name, slug, parentCategory });
    await newSubcategory.save();

    res
      .status(201)
      .json({ message: "Subcategory created", subcategory: newSubcategory });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create subcategory", error: err.message });
  }
};

//Get all subcategories under a category
export const getSubcategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const subcategories = await Subcategory.find({ parentCategory: categoryId });
  res.json(subcategories);
};
