exports.orderTotalQ = (cart) => {
  if (cart) {
    const totalQ = cart.reduce(
      (acc, productoActual) =>
        (acc += productoActual.qty),
      0
    );

    return totalQ;
  }
  return 0;
};
