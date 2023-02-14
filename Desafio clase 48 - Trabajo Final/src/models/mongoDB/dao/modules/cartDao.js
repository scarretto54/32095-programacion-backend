const { logger } = require("../../../../logger/index");
const itemQty = require("../../../../utils/itemQty");
const { cartDto } = require("../../dto/index");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllCartItems(userId) {
    try {
      let allItems = await this.model
        .findOne({ userId })
        // .populate(["products"])
        .lean();
       if (allItems !== null ){
        allItems = itemQty.itemQty(allItems)
        return allItems;
      }       

      return allItems;
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
