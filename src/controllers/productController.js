import slugify from "slugify";
import { addNewProduct } from "../models/Product/productModel.js";
import responseClient from "../utility/responseClient.js";
import { getCategoryById } from "../models/Category/categoryModel.js";
export const addProductController = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title, { lower: true });
    const category = await getCategoryById(req.body.categoryId);
    if (!category?._id) {
      throw new Error("could not find category");
    }
    const productPath = `${category?.path}/${slug}`;
    const obj = {
      ...req.body,
      slug,
      productPath,
    };

    const product = await addNewProduct(obj);
    product?._id
      ? responseClient({ res, message: "Product added succesfully👌" })
      : responseClient({
          res,
          message:
            "something went wrong,Product cound not added please try again!😒",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
