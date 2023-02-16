const { logger } = require("../../../../logger/index");
const itemQty = require("../../../../utils/itemQty");
const { ordersDto } = require("../../dto/index");
const { asPOJO, renameField, removeField } = require("../../../../utils/objectUtils")

module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async createOrder(order) {
    try {
    const products = itemQty.itemQty(order);
    order.products = products;
    const newOrder = await this.model.create(order);
    await newOrder.populate(["user"]);
    renameField(newOrder, '_id', 'id')
    removeField(newOrder, '__v')
    return new ordersDto(newOrder);
  } catch (error) {
    logger.error(error);
  }  
  }

  async getNumOrders() {
    try {
    const orders = await this.model.find();
    renameField(orders, '_id', 'id')
    removeField(orders, '__v')
    return orders.length;
  } catch (error) {
    logger.error(error);
  }  
  }
};
