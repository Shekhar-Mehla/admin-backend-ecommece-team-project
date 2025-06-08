import Product from "../models/Product/productModel.js";

export const addProductController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      salePrice,
      isOnSale,
      category,
      subcategory,
      sizes,
      tags,
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      salePrice,
      isOnSale,
      category,
      subcategory,
      sizes,
      tags,
      images: [],
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};
