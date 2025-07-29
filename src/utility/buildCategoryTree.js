const buildCategoryTree = (categories) => {
  const idToNodeMap = {};
  const tree = [];

  // This is for creating map and add children array
  categories.forEach((cat) => {
    idToNodeMap[cat._id] = { ...cat, children: [] };
  });

  // This is for creating the tree
  categories.forEach((cat) => {
    if (cat.parent) {
      const parent = idToNodeMap[cat.parent];
      if (parent) {
        parent.children.push(idToNodeMap[cat._id]);
      }
    } else {
      tree.push(idToNodeMap[cat._id]);
    }
  });

  return tree;
};

export default buildCategoryTree;
