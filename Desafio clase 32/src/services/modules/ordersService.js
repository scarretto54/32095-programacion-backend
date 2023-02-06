const logger = require("../../utils/logger");

module.exports = class {
  constructor(ordersDao) {
    this.ordersDao = ordersDao;
  }

  async createOrder(order) {
    try {
      const number = await this.ordersDao.getNumOrders();
      order.orderNumber = number + 1;
      const newOrder = await this.ordersDao.createOrder(order);
      logger.info('Nueva orden generada')
      return newOrder;
    } catch (error) {
      logger.error(error);
    }
  }
};
