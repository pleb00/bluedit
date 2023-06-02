const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (hashPassword, plainPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
module.exports = { hashPassword, comparePassword };
