module.exports = class {
  constructor(data) {
    this.date = data.date;
    this.user = data.user;
    this.products = data.products;
    this._id = data._id;
    // data.id || data._id ? (this.id = data.id || data._id.toString()) : null;    
  }
  
  // cartProducts(data) {
  //   if (data) {
  //     let productsOnCart = data.products;
  
  //     const products = productsOnCart.reduce((acc, productoActual) => {
  //       const item = acc.find((product) => product._id === productoActual._id);
  //       if (item) {
  //         item.qty = item.qty + 1;
  //       } else {
  //         productoActual.qty = 1;
  //         acc.push(productoActual);
  //       }
  //       return acc;
  //     }, []);
  
  //     return products;
  //   }
  //   return null;
  // };
}
