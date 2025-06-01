import bcrypt from "bcrypt";

// Hash password
export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};
// Compare password with hash:
export const comparePassword = (password, hash) => {
  const isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
