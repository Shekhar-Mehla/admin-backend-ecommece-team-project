import categoryCollection from "./categorySchema.js";
// add new category
export const addNewCategiry = async (obj) => {
  const category = await categoryCollection(obj).save();
  return category;
};

export const getCategoryById = async (_id) => {
  return await categoryCollection.findById({ _id });
};

export const getCategoryBySlug = async (slug) => {
  return await categoryCollection.findOne({ slug });
};
