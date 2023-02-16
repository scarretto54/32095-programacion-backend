const { logger } = require("../../logger/index");
const { orderTotal } = require("../../utils/orderTotal");

module.exports = class {
  constructor(productsService, cartService, chatService) {
    this.productsService = productsService;
    this.cartService = cartService;
    this.chatService = chatService;
  }
  // ------------------- Product Controllers -------------/
  async getAllProducts(req, res, next) {
    try {      
      if (req.user === undefined){
      const  userInfo = null    
      let listaDeProductos = await this.productsService.getAllProducts();
        logger.info(listaDeProductos)
      res.render("pages/productos", { listaDeProductos, userInfo: false });
      return;
      }
      const  userInfo = req.user
      
      let listaDeProductos = await this.productsService.getAllProducts();

      res.render("pages/productos", { listaDeProductos, userInfo});
      return;

    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {      
      if (req.user === undefined){
        userInfo = null
        let listaDeProductos = await this.productsService.getProduct(
          req.params.id
        );
  
        res.render("pages/productoDetails", {
          listaDeProductos: listaDeProductos,
          userInfo: false
        });
        return;
      }
      const userInfo = req.user
      let listaDeProductos = await this.productsService.getProduct(
        req.params.id
      );

      res.render("pages/productoDetails", {
        listaDeProductos: listaDeProductos,
        userInfo,
      });
      return;
    } catch (error) {}
  }

  async getProductByCategory(req, res, next) {
    try {      
      if (req.user === undefined){        
        const userInfo = null 
        let listaDeProductos = await this.productsService.getProductByCategory(
          req.params.categoria
        );  
        res.render("pages/productos", {
          listaDeProductos,
          userInfo: false 
        });
        return;
      }
      const userInfo = req.user
      let listaDeProductos = await this.productsService.getProductByCategory(
        req.params.categoria
      );
      res.render("pages/productos", {
        listaDeProductos,
        userInfo,
      });
      return;
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  // ------------------- Cart Controllers -------------/
  async getCartByUserId(req, res, next) {
    try {
      const userInfo = req.user;
      let listaDeProductosEnCarro = await this.cartService.getAllCartItems(
        req.user.id
      );

      const total = orderTotal(listaDeProductosEnCarro);

      if (listaDeProductosEnCarro === null) {
        res.render("pages/carrito", {
          listaDeProductosEnCarro: false,
          total,
          userInfo,
        });
        return;
      }
      res.render("pages/carrito", {
        listaDeProductosEnCarro,
        total,
        userInfo,
      });
      return;
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // --------------- Chat Controllers----------------/
  async getAllMessages(req, res, next) {
    try {
      const userInfo = req.user;
      const allMessages = await this.chatService.getAllMessages();

      res.render("pages/chatPage", { allMessages, userInfo });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async getAllMessagesByEmail(req, res, next) {
    try {
      const userInfo = req.user;
      const allMessages = await this.chatService.getAllMessagesByEmail(
        req.params.email
      );
      res.render("pages/chatPage", { allMessages, userInfo });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
