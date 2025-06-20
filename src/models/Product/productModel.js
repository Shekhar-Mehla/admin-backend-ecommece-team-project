
import productCollection from "./productSchema.js";

// add new product
export const addNewProduct = async (obj) => await productCollection(obj).save();
export const getProductsByCategoryId = async (filter) =>
  await productCollection.find(filter);
export const getProductById = async (filter) =>
  await productCollection.findById(filter);
export const getAllProducts = async () => await productCollection.find();
export const updateProduct = async (filter, update) =>
  await productCollection.findOneAndUpdate(filter, update, { new: true });
export const deleteProducts = async (arrayOfIds) =>
  await productCollection.deleteMany({ _id: { $in: arrayOfIds } },[]);
