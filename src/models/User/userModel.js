import userCollection from "./userSchema.js";
// create new data
export const addNewUser = async (obj) => {
  const newUser = await userCollection(obj).save();
  return newUser;
};
// update data
export const updateUser = async (filter, update) => {
  const newUser = await userCollection.findOneAndUpdate(filter, update, {
    new: true,
  });
  return newUser;
};
