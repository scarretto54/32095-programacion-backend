const logger = require("../../../../utils/logger");
const itemQty = require("../../../../utils/itemQty");
const { cartDto } = require("../../dto/index");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllCartItems(userId) {
    try {
      const allItems = await this.model
        .findOne({ userId })
        .populate(["products"])
        .lean();

      return itemQty.itemQty(allItems);
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await this.model.create(cart);
      await newCart.populate(["products"]);
      return new cartDto(newCart);
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      console.log(newProduct)
      const cartUpdated = await this.model
        .findOneAndUpdate(
          { user: id },
          { $push: { products: newProduct } },
          {
            new: true,
          }
        )
        .populate(["products"]);

      return new cartDto(cartUpdated);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await this.model.deleteOne(user);
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
