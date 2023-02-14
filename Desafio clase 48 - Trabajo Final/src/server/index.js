const server = require("./serverConfig");
const { PORT } = require("../config/globals");
const { getConnection } = require("../config/connection");
const { logger } = require("../logger/index");

getConnection()
  .then(
    (message) => {
    logger.info(message);
    server.listen(PORT, () => logger.info(`Servidor en el puerto ${PORT}`));
    server.on("error", (error) => logger.error(error));
  }
  )
  .catch((error) => logger.error(error));
