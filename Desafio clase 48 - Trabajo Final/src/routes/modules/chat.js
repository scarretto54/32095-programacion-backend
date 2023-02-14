const { chatController } = require("../../controllers/index");
const { logger } = require("../../logger/index");

module.exports = (io) => {
  //Chat
  io.on("connection", async (socket) => {
    logger.debug("¡Nuevo cliente conectado!");

    //Recibir nuevo mensaje
    socket.on("newMessage", async (mensaje) => {
      let messages = await chatController.saveMessage(socket, mensaje);
    });
  });
};
