const { logger } = require("../../logger/index");
module.exports = class {
  constructor(cartService, notificationService) {
    this.cartService = cartService;
    this.notificationService = notificationService;
  }
  async getCartByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const shoppingCart = await this.cartService.getAllCartItems(id);          
      return shoppingCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async addShoppingCartByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const product = req.body;
      const shoppingCartCreated = await this.cartService.addCart({
        user: id,
        products: product,
      });
      res.send(shoppingCartCreated);
    } catch (error) {
      logger.error(error);
    }
  }

  async updateorCreateShoppingCartByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const products = req.body;
      const shoppingCartUpdated = await this.cartService.updateCart(
        id,
        products
      );
      res.send(shoppingCartUpdated);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteShoppingCartByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const deleted = await this.cartService.deleteCart(id);
      res.send(deleted);
    } catch (error) {
      logger.error(error);
    }
  }
};
