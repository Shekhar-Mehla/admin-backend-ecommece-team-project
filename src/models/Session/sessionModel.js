import sessionCollection from "./sessionSchema.js";
export const createNewSession = async (obj) => {
  const session = await sessionCollection(obj).save();
  return session;
};

//get session
export const getSession = async (filter) => {
  const session = await sessionCollection.findOne(filter);
  return session;
};

//delete session
export const deleteSession = async ({ token, association }) => {
  const session = await sessionCollection.findOneAndDelete({
    token,
    association,
  });
  return session;
};
