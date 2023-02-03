const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const handlebars = require("express-handlebars");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const Libreria = require("./class/contenedor");
const productos = new Libreria('productos');

const ApiProductos = require("./api/apiProductos.js");
const apiProductos = new ApiProductos();


app.use(express.static("./views/layouts"));
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.set('views', './views')
app.set('views engine', 'hbs')

app.engine(
  "hbs",
  handlebars.engine({
      extname: ".hbs",
      partialsDir: __dirname + "/views/partials",
  })
);

app.get("/", async (req, res) => {
    let content = await productos.getAll()
    let boolean = content.length !== 0;
    return res.render("layouts/main.hbs", {list: content, showList: boolean});  
})

app.get("/productos-test", async (req, res) => {
  const content = await apiProductos.productos();
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", {list: content, showList: boolean});  
});


app.post("/", async (req, res) => {      
    let obj =  req.body
    let content = await productos.getAll()
    let boolean =  content.length !==0;
    return res.render("layouts/main.hbs", {list: content, showList: boolean});
});


const ApiChat = require("./api/apiChat");
const apiChat = new ApiChat();
let messages = [];


    
  io.on("connection", async (socket) => {
      console.log('usuario conectado')

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
      

httpServer.listen(process.env.PORT || 5000, () => {
    console.log("SERVER ON");
  });

  


