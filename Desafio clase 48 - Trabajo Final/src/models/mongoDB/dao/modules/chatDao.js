const { logger } = require("../../../../logger/index");
const { chatDto } = require("../../dto/index");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllMessages() {
    try {
      const messages = await this.model.find({}).lean();
      return messages.map(messages => new chatDto(messages));
    } catch (error) {
      logger.error(error);
    }
  }

  async saveMessage(message) {
    try {
      const newMessage = await this.model.create(message);
      return new chatDto(newMessage);
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllMessagesByEmail(email) {
    try {
      const messages = await this.model.find({ "author.email": email }).lean();
      return messages.map(messages => new chatDto(messages));
    } catch (error) {
      logger.error(error);
    }
  }
};
