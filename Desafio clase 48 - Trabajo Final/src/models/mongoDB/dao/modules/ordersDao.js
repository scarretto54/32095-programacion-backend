const itemQty = require("../../../../utils/itemQty");
const { ordersDto } = require("../../dto/index");

module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async createOrder(order) {
    const products = itemQty.itemQty(order);
    order.products = products;
    const newOrder = await this.model.create(order);
    await newOrder.populate(["user"]);
    return new ordersDto(newOrder);
  }

  async getNumOrders() {
    const orders = await this.model.find();
    return orders.length;
  }
};
