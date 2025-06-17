import { getCategoryById } from "../models/Category/categoryModel.js";

export const getCategoryPath = async ({ name, parentId }) => {
  let path = ``;

  let level = 1;
  if (parentId) {
    const parentCategory = await getCategoryById(parentId);

    path = `${parentCategory.path}/${name.toLowerCase()}`;
    level = parentCategory.level + 1;
  } else {
    path = `/${name.toLowerCase()}`;
  }
  return { path, level };
};
