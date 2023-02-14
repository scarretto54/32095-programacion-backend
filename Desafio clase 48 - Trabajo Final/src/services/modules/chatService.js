const { logger } = require("../../logger/index");

module.exports = class {
  constructor(chatDao) {
    this.chatDao = chatDao;
  }
  async getAllMessages() {
    try {
      return await this.chatDao.getAllMessages();
    } catch (error) {
      logger.error(error);
    }
  }

  async saveMessage(message) {
    try {
      const newMessage = await this.chatDao.saveMessage(message);
      return newMessage;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllMessagesByEmail(email) {
    try {
      const messages = await this.chatDao.getAllMessagesByEmail(email);
      return messages;
    } catch (error) {
      logger.error(error);
    }
  }
};
