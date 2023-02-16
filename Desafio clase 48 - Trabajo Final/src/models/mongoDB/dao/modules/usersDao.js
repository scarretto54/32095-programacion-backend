const { logger } = require("../../../../logger/index");
const { usersDto } = require("../../dto/index");
const { usersAuthDto } = require("../../dto/index");
const { asPOJO, renameField, removeField } = require("../../../../utils/objectUtils")
module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async findUserByID(id) {
    try {
      const user = await this.model.findById(renameField(id, 'id', '_id'));
      renameField(user, '_id', 'id')
      removeField(user, '__v')
      return new usersDto(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email: email }).lean();
      renameField(user, '_id', 'id')
      removeField(user, '__v')
      return new usersAuthDto(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async addUser(userInfo) {
    try {
      const newCreatedUser = await this.model.create(userInfo);
      renameField(newCreatedUser, '_id', 'id')
      removeField(newCreatedUser, '__v')
      return new usersDto(newCreatedUser);
    } catch (error) {
      logger.error(error);
    }
  }
};
