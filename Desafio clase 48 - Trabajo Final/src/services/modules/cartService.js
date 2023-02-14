const { logger } = require("../../logger/index");

module.exports = class {
  constructor(cartDao) {
    this.cartDao = cartDao;
  }
  async getAllCartItems(userId) {
    try {
      const cart = await this.cartDao.getAllCartItems(userId);
      return cart;
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await this.cartDao.addCart(cart);
      logger.debug(`Carrito con id ${newCart.id} creado con éxito`);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      const cartUpdated = await this.cartDao.updateCart(id, newProduct);
      if (cartUpdated !== undefined) {
        logger.debug(`Carrito con id ${id} modificado con éxito`);
        return cartUpdated;}
        logger.warn(`Carrito con id ${id} no encontrado`);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await this.cartDao.deleteCart(user);
      if (cartToDelete !== undefined) {
        logger.debug(`Carrito del usuario ${user} eliminado con éxito`);
        return cartToDelete;}
        logger.warn(`Carrito del usuario ${user} no encontrado`);
    } catch (error) {
      logger.error(error);
    }
  }
};
