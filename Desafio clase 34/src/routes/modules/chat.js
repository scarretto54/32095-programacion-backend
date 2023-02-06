const { chatController } = require("../../controllers/index");
const logger = require("../../utils/logger");

module.exports = (io) => {
  //Chat
  io.on("connection", async (socket) => {
    logger.info("¡Nuevo cliente conectado!");

    //Recibir nuevo mensaje
    socket.on("newMessage", async (mensaje) => {
      let messages = await chatController.saveMessage(socket, mensaje);
    });
  });
};
