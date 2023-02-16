const { logger } = require("../../../../logger/index");
const itemQty = require("../../../../utils/itemQty");
const { cartDto } = require("../../dto/index");
const { asPOJO, renameField, removeField } = require("../../../../utils/objectUtils")

module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllCartItems(userId) {
    try {
      let allItems = await this.model
        .findOne({userId})
        // .populate(["products"])
        .lean();
       if (allItems !== null ){
        allItems = itemQty.itemQty(renameField(allItems, '_id', 'id'))
        return allItems;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      renameField(newProduct, 'id', '_id')
      const newCart = await this.model.create(cart);      
      await newCart.populate(["products"]);
      renameField(newCart, '_id', 'id')
      removeField(newCart, '__v')
      return new cartDto(newCart);
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      renameField(newProduct, 'id', '_id')
      const cartUpdated = await this.model
        .findOneAndUpdate(
          { user: id },
          { $push: { products: newProduct } },
          {
            new: true,
          }
        ).populate(["products"]);
        renameField(cartUpdated, '_id', 'id')
        removeField(cartUpdated, '__v') 
      return new cartDto(cartUpdated);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await this.model.deleteOne({user });
      renameField(cartToDelete, '_id', 'id')
      removeField(cartToDelete, '__v') 
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
