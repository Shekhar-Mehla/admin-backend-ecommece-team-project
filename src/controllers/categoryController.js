import Category from "../models/Category/categoryModel.js";
import Product from "../models/Product/productModel.js";
import { updateChildrenPaths } from "../utility/updateChildrenPaths.js";
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

// To update a particular category
export const updateCategory = async (req, res) => {
  const { _id } = req.params; // Get the category ID from the request parameters
  const { name, slug, parent, path, level } = req.body; // Get the updated data from the request body
  try {
    //Avoid duplicate slugs
    const existing = await Category.findOne({ slug, _id: { $ne: _id } });
    if (existing) {
      return res.status(400).json({ message: "Slug already in use.." });
    }

    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { name, slug, parent, path, level },
      { new: true }
    );

    //If 'a parent category' is changed, update path and level of its children.
    await updateChildrenPaths(updatedCategory);

    // If the category is not found, return a 404 error
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Else return the updated category
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// To delete a category
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
