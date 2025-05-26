import userCollection from "./userSchema.js";

export const addNewUser = async (obj) => {
  const newUser = await userCollection(obj).save();
  return newUser;
};
