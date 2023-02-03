const infoWebRouter = require("express").Router();
const  isAuth = require('../../auth/index.js')

const os = require('os')
const countCPUS = os.cpus().length

infoWebRouter.get("/info",  isAuth.isAuth, (req, res) => {
    const args =
      process.argv.length > 2 ? process.argv.slice(2).join(", ") : "Vacio";
  
    res.send(`
      <ul>
      <li>Args de entrada: ${args}</li>
      <li>Plataforma: ${process.platform}</li>
      <li>Version Node.Js: ${process.version}</li>
      <li>Memoria total reservada: ${`${Math.round(
        process.memoryUsage().rss / 1024
      )} KB`}</li>
      <li>Path de ejecución: ${process.execPath}</li>
      <li>Process id: ${process.pid}</li>
      <li>Carpeta del proyecto: ${process.cwd()}</li>
      <li>N° Procesadores ${countCPUS}</li>     
      </ul>`);
  });


  module.exports =  infoWebRouter;