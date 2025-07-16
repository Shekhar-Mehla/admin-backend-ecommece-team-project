import Category from "../models/Category/categoryModel.js";
import Product from "../models/Product/productModel.js";

export const addProductController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      images,
      thumbnail,
      categoryId,
      stock,
      sizes,
      colors,
      brand,
      status,
      tags,
    } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const slug = title.toLowerCase().replace(/ /g, "-");
    const product = await Product.create({
      title,
      description,
      slug,
      price,
      discountPrice,
      images,
      thumbnail,
      categoryId,
      categoryPath: category.path,
      stock,
      sizes,
      colors,
      brand,
      status,
      tags,
    });

    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

export const getAllProducts = async (req, res) => {};
