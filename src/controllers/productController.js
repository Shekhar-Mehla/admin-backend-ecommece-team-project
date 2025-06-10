import slugify from "slugify";
import {
  getCategoryById,
  getCategoryBySlug,
} from "../models/Category/categoryModel.js";
import responseClient from "../utility/responseClient.js";
import { addNewProduct, getProduct } from "../models/Product/productModel.js";
// create the product
export const createNewProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      stock,
      sizes,
      colors,
      brand,
      categoryId,
      images,
      thumbnail,
      status,
      tags,
    } = req.body;

    // Slugify title
    const slug = slugify(title, { lower: true });

    const category = await getCategoryById(categoryId);
    console.log(category, "cccc");

    if (!category)
      return responseClient({
        res,
        message: "Category not found",
        statusCode: 404,
      });
    const categoryPath = category.path;
    const obj = {
      title,
      description,
      price,
      discountPrice,
      stock,
      sizes,
      colors,
      brand,
      slug,
      images,
      thumbnail,
      status,
      tags,
      categoryId,
      categoryPath,
    };
    const newProduct = await addNewProduct(obj);
    if (newProduct?._id) {
      return responseClient({
        res,
        message: "new product has been added",
        payload: newProduct,
      });
    }
    responseClient({
      res,
      statusCode: 404,
      message: "could not added the new product",
    });
  } catch (error) {
    next(error);
  }
};

// get the product

export const getproducta = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return responseClient({
        res,
        message: "no slug is found",
        statusCode: 401,
      });
    }

    const category = await getCategoryBySlug(slug);
    console.log(category, "....");

    if (!category?._id) {
      return responseClient({
        res,
        message: "no category  is found",
        statusCode: 401,
      });
    }

    const getProducts = await getProduct(category.path);

    if (!getProducts?.length && Array.isArray(getProducts)) {
      return responseClient({
        res,
        message: "no product found",
        statusCode: 401,
      });
    }

    return responseClient({
      res,
      message: "here is the product",
      payload: getProducts,
    });
  } catch (error) {
    next(error);
  }
};
