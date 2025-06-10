import productCollection from "./productschema.js";

productCollection;
// add new category
export const addNewProduct = async (obj) => {
  const product = await productCollection(obj).save();
  return product;
};

export const getProduct = async (categoryPath) => {
  const p = await productCollection.find({
    categoryPath: { $regex: new RegExp(`^${categoryPath}`, "i") }, // case-insensitive
  });
  return p
};
