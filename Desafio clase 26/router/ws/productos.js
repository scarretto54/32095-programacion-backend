
const Libreria = require('../../class/contenedorMySQL');
const productos = new Libreria('productos');

async function productosSocket(socket, sockets) {

  /* PRODUCTOS */
  socket.on("newProduct", async (obj) => {
    await productos.insert(obj)            
    sockets.emit('products', [obj])        
  });
}

module.exports = { productosSocket }