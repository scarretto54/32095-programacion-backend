const { logger } = require("../../../../logger/index");
const { chatDto } = require("../../dto/index");
const { asPOJO, renameField, removeField } = require("../../../../utils/objectUtils")
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllMessages() {
    try {
      const messages = await this.model.find({}).lean();
      renameField(messages, '_id', 'id')
      removeField(messages, '__v') 
      return messages.map(messages => new chatDto(messages));
    } catch (error) {
      logger.error(error);
    }
  }

  async saveMessage(message) {
    try {
      const newMessage = await this.model.create(message);
      renameField(newMessage, '_id', 'id')
      removeField(newMessage, '__v') 
      return new chatDto(newMessage);
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllMessagesByEmail(email) {
    try {
      const messages = await this.model.find({ "author.email": email }).lean();
      renameField(messages, '_id', 'id')
      removeField(messages, '__v') 
      return messages.map(messages => new chatDto(messages));
    } catch (error) {
      logger.error(error);
    }
  }
};
