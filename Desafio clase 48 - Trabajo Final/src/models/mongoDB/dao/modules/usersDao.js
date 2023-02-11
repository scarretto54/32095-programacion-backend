const logger = require("../../../../utils/logger");
const { usersDto } = require("../../dto/index");
const { usersAuthDto } = require("../../dto/index");
module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async findUserByID(id) {
    try {
      const user = await this.model.findById(id);
      return new usersDto(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email: email }).lean();
      return new usersAuthDto(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async addUser(userInfo) {
    try {
      const newCreatedUser = await this.model.create(userInfo);
      return new usersDto(newCreatedUser);
    } catch (error) {
      logger.error(error);
    }
  }
};
