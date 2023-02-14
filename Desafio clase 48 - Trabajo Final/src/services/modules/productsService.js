const { logger } = require("../../logger/index");

module.exports = class {
  constructor(productDao) {
    this.productDao = productDao;
  }
  async getProduct(id) {
    try {
      const Product = await this.productDao.getProduct(id);
      if (Product !== undefined) {
      return Product;}
      logger.warn(`Producto con id ${id} no encontrado`);
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductByCategory(category) {
    try {
      const Product = await this.productDao.getProductByCategory(category);
      return Product;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.productDao.getAllProducts();
      return allProducts;
    } catch (error) {
      logger.error(error);
    }
  }
  async addProduct(producto) {
    try {
      const product = await this.productDao.addProduct(producto);
      return product;
    } catch (error) {
      logger.error(error);
    }
  }
  async updateProduct(id, productUpdated) {
    try {
      const productToUpdate = await this.productDao.updateProduct(
        id,
        productUpdated
      );
      if (productToUpdate !== undefined) {
        logger.info(`Producto con id ${id} modificado con éxito`);
        return productToUpdate;}
        logger.warn(`Producto con id ${id} no encontrado`);
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteProduct(id) {
    try {
      const productToDelete = await this.productDao.deleteProduct(id);
      if (productToUpdate !== undefined) {
        logger.info(`Producto con id ${id} eliminado con éxito`);
        return productToDelete;}
        logger.warn(`Producto con id ${id} no encontrado`);
    } catch (error) {
      logger.error(error);
    }
  }
};
