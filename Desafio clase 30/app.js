const express = require("express");
const session = require("express-session");
require("dotenv").config({ path: "./config/.env" });
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const yargs = require('yargs')(process.argv.slice(2))
const passport = require('passport');

//Desafio 30

////////////////////////////////////
const os = require('os')

//Yargs
const args = yargs
    .default({
        port:5000,
        mode:'cluster'
    })
    .parse()

const PORT = args.port || 5000
// const MODE = args.mode || 'CLUSTER'
const countCPUS = os.cpus().length



const authWebRouter = require('./router/web/auth.js')
const homeWebRouter = require('./router/web/home.js')
const infoWebRouter = require('./router/web/info.js')
const randomsWebRouter = require('./router/web/randoms.js')

const addProductosHandlers = require('./router/ws/productos.js')
const addMensajesHandlers = require('./router/ws/mensajes.js')

//App
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Persistencia
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Session-Mongo
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      mongoOptions: adavancedOptions,
    }),
    secret: process.env.MONGOSECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(express.static("./views/layouts"));

//Motor plantillas
app.engine(
  "hbs",
  handlebars.engine({
      extname: ".hbs",
      partialsDir: __dirname + "/views/partials",
  })
);
app.set('views', './views')
app.set('views engine', 'hbs')

//Router
app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)
app.use(randomsWebRouter)


//Desafio clase 30

// const cluster = require('cluster')
// if(MODE && MODE == 'CLUSTER' && cluster.isMaster) {

//   console.log(`Master ${process.pid} is running on ${PORT}`) 

//   for(let i=0; i < countCPUS; i++) {
//       cluster.fork()
//   }

//   cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker ${worker.process.pid} died :(`)
//   })

// } else {

//   app.get('/api/randoms', (req, res) => {
//       console.log(`Get Randoms +++++++ [${process.pid}] (${new Date().toLocaleString()})`)
//       res.send('Check Randoms')
//   })

//   app.get('/api/setting', (req, res) => {
//       console.log(`Setting ======= [${process.pid}] (${new Date().toLocaleString()})`)
//       res.send('Check settings')
//   })

//   app.listen(PORT, err => {
//       console.log(`Listening ${PORT} [${MODE}]...`)
//   })

//   console.log('Worker ' + process.pid + ' stared')
// }

////////////////////////////////////

//websocket
io.on("connection", async (socket) => {  
  /* CHAT */
  addMensajesHandlers.mensajesSocket(socket, io.sockets)
  /* PRODUCTOS */
  addProductosHandlers.productosSocket(socket, io.sockets)
});

//Server
httpServer.listen(PORT, () => {
  console.log('SERVER ON PORT ' + PORT  );
});

//Errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});


  


