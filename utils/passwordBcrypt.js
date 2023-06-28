const { compareSync, genSaltSync, hashSync } = require("bcryptjs");

const generateHash = (password) => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
};

const comparePasswords = (password, hashedPassword) => {
  return compareSync(password, hashedPassword);
};

module.exports = { generateHash, comparePasswords };
