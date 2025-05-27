import sessionCollection from "./sessionSchema.js";
export const createNewSession = async (obj) => {
  const session = await sessionCollection(obj).save();
  return session;
};
export const deleteSession = async (obj) => {
  const session = await sessionCollection.findOneAndDelete(obj);
  return session;
};
