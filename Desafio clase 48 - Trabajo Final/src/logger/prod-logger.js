const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, errors, json, label } = format;

const buildProdLogger = () => {
  const PID = process.pid;
  const logFormat = printf(({ level, message, timestamp, label, stack }) => {
    return `${timestamp} [PID ${label}] ${level}: ${stack || message}`;
  });

  return createLogger({
    level: "info",
    format: combine(label({ label: PID }), errors({ stack: true })), //errors debe ir a este nivel, sino no lo toma
    transports: [
      new transports.Console({
        format: combine(format.colorize(), timestamp(), logFormat)
      }),
      new transports.File({
        filename: "logs/error.log",
        level: "warn",
        format: combine(timestamp(), json())
      })
    ]
  });
};

module.exports = { buildProdLogger };
