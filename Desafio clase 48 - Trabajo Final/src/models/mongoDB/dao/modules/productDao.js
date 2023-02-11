const logger = require("../../../../utils/logger");
const { productDto } = require("../../dto/index");

module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getProduct(id) {
    try {
      const Product = await this.model.findById(id).lean();
      return new productDto(Product);
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductByCategory(category) {
    try {
      const Product = await this.model.find({ category: category }).lean();
      return Product.map(Product => new productDto(Product));
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.model.find().lean();
      return allProducts.map(allProducts => new productDto(allProducts));
    } catch (error) {
      logger.error(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.model.create(producto);
      return new productDto(product);
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
      return new productDto(productToUpdate);
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
