import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};
