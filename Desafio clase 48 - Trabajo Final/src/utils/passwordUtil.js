const bcrypt = require("bcrypt");
const { logger } = require("../logger/index");
const saltRounds = 10;

const createPassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
  } catch (error) {
    logger.error(error.stack);
  }
};

const validPassword = async (password, userPassword) => {
  try {
    const match = await bcrypt.compare(password, userPassword);
    return match;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { createPassword, validPassword };
