import sessionCollection from "./sessionSchema.js";
export const createNewSession = async (obj) => {
  const session = await sessionCollection(obj).save();
  return session;
};
