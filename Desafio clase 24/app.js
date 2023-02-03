const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const session = require("express-session");
const handlebars = require("express-handlebars");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//PERSISTENCIA
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Session-Mongo
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://coder:coderbackend123@cluster0.tku0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      mongoOptions: adavancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
  })
);

const Libreria = require("./class/contenedor");
const productos = new Libreria('productos');

const ApiProductos = require("./api/apiProductos.js");
const apiProductos = new ApiProductos();

//Middlewares
app.use(express.static("./views/layouts"));
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

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

// Login
app.get("/login", (req, res) => {
  return res.render("login.hbs");
});
4
app.post("/login", (req, res) => {
  let username = req.body.name;
  req.session.user = username;
  console.log('usuario conectado')
  return res.redirect("/");  
});

app.get("/logout", (req, res) => {
  let name = req.session.user
  req.session.destroy((err) => {
    if (!err) {
      res.render("goodbye.hbs", {name: name});
      console.log('usuario desconectado')
    } else res.send({ status: "Logout ERROR", body: err });
  });
});

// Main
app.get("/", async (req, res) => {
  if (req.session.user) {
    let content = await productos.getAll()
    let boolean = content.length !== 0;
    return res.render("index.hbs", {    
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

app.get("/productos-test", async (req, res) => {
  if (req.session.user) {
  const content = await apiProductos.productos();
  let boolean = content.length !== 0;
  return res.render("index.hbs", {
     list: content,
     showList: boolean,
     name: req.session.user
    });  
  } else return res.redirect("login");  
});

app.post("/", async (req, res) => {
  if (req.session.user) {
    let obj =  req.body
    let content = await productos.getAll()
    let boolean = content.length !== 0;
    return res.render("index.hbs", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

const ApiChat = require("./api/apiChat");
const apiChat = new ApiChat();
let messages = [];


  //WEBSOCKET  
  io.on("connection", async (socket) => {  

  /* CHAT */
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length+1
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });

  /* PRODUCTOS */
      socket.on("newProduct", async (obj) => {
        await productos.insert(obj)            
        io.sockets.emit('products', [obj])        
      })
      });


//Errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});

//Server
httpServer.listen(process.env.PORT || 8080, () => {
    console.log("SERVER ON");
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}`);
  });

  


