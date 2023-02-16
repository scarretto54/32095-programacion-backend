const { logger } = require("../../../../logger/index");
const { productDto } = require("../../dto/index");
const { asPOJO, renameField, removeField } = require("../../../../utils/objectUtils")
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getProduct(id) {
    try {
      const product = await this.model.findById({ '_id': id}).lean();
      renameField(product, '_id', 'id')
      removeField(product, '__v')    
      return new productDto(product);
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductByCategory(category) {
    try {
      const products = await this.model.find({ category: category });
      renameField(products, '_id', 'id')
      removeField(products, '__v') 
      return products.map(product => new productDto(product));
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.model.find();
      renameField(allProducts, '_id', 'id')
      removeField(allProducts, '__v') 
      return allProducts.map(allProducts => new productDto(allProducts));
    } catch (error) {
      logger.error(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.model.create(producto);
      renameField(product, '_id', 'id')
      removeField(product, '__v') 
      return new productDto(product);
    } catch (error) {
      logger.error(error);
    }
  }
  async updateProduct(id, productUpdated) {
    try {
      renameField(productUpdated, 'id', '_id')
      const productToUpdate = await this.model.findByIdAndUpdate(
        id,
        // { '_id': {id}},
        productUpdated,
        { new: true }
      );
      renameField(productToUpdate, '_id', 'id')
      removeField(productToUpdate, '__v') 
      return new productDto(productToUpdate);
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteProduct(id) {
    try {
      const productToDelete = await this.model.findByIdAndDelete({ '_id': id});
      renameField(productToDelete, '_id', 'id')
      removeField(productToDelete, '__v') 
      return productToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
