const { buildDevLogger } = require("./dev-logger");
const { buildProdLogger } = require("./prod-logger");
const NODE_ENV = require("../config/globals");

// construyo el logger personalizado según el entorno
const logger =
  NODE_ENV === "production" ? buildProdLogger() : buildDevLogger();

  module.exports =  { logger };
