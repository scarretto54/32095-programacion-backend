const logger = require("../../../../utils/logger");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getProduct(id) {
    try {
      const Product = await this.model.findById(id).lean();
      return Product;
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductByCategory(category) {
    try {
      const Product = await this.model.find({ category: category }).lean();
      return Product;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.model.find().lean();
      return allProducts;
    } catch (error) {
      logger.error(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.model.create(producto);
      return product;
    } catch (error) {
      logger.error(error);
    }
  }
  async updateProduct(id, productUpdated) {
    try {
      const productToUpdate = await this.model.findByIdAndUpdate(
        id,
        productUpdated,
        { new: true }
      );
      return productToUpdate;
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteProduct(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
    }
  }
};
