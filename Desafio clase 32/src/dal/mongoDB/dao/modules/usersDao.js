const logger = require("../../../../utils/logger");
module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async findUserByID(id) {
    try {
      const user = await this.model.findById(id);
      return user;
    } catch (error) {
      logger.error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      logger.error(error);
    }
  }

  async addUser(userInfo) {
    try {
      const newCreatedUser = await this.model.create(userInfo);
      return newCreatedUser;
    } catch (error) {
      logger.error(error);
    }
  }
};
