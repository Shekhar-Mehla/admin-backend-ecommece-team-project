import Category from "../models/Category/categoryModel.js";

export const updateChildrenPaths = async (parentCategory) => {
  const children = await Category.find({ parent: parentCategory._id });
  for (const child of children) {
    const newPath = `${parentCategory.path}/${child.slug}`;
    const newLevel = parentCategory.level + 1;

    await Category.findByIdAndUpdate(child._id, {
      path: newPath,
      level: newLevel,
    });

    // Recursively update the next level
    await updateChildrenPaths({
      ...child.toObject(),
      path: newPath,
      level: newLevel,
    });
  }
};
