import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};
// Compare password with hash:
export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
