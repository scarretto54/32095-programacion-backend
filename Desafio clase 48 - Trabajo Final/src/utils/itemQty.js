exports.itemQty = (cart) => {
  if (cart) {
    let productsOnCart = cart.products;

    const products = productsOnCart.reduce((acc, productoActual) => {
      const item = acc.find((product) => product._id === productoActual._id);
      if (item) {
        item.qty = item.qty + productoActual.qty <= item.stock ? item.qty + productoActual.qty : item.stock ;

      } else {
        productoActual.qty = productoActual.qty <= productoActual.stock ? productoActual.qty : productoActual.stock ;
        acc.push(productoActual);
      }
      return acc;
    }, []);

    return products;
  }
  return null;
};