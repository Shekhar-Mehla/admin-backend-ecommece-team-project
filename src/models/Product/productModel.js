import productCollection from "./productSchema.js";

// add new product
export const addNewProduct = async (obj) => await productCollection(obj).save();
