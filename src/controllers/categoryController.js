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

// To update a particular category
export const updateCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the request parameters
  const { name, description, path, level } = req.body; // Get the updated data from the request body

  try {
    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, path, level },
      { new: true }
    );

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
