import userCollection from "./userSchema.js";

// add new user
export const addNewUser = async (obj) => {
  const newUser = await userCollection(obj).save();
  return newUser;
};

// Find user by email
export const findUserByEmail = async (email) => {
  const user = await userCollection.findOne({ email });
  return user;
};

//update a user
export const updateUser = async (filter, updatedUser) => {
  const user = await userCollection.findOneAndUpdate(filter, updatedUser);
  return user;
};
