const express = require("express");
const Libreria = require("./class/contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(express.static("./views/layouts"));

const productos = new Libreria(__dirname + "/data/productos.json");
const messages = []


app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials",
    })
);

app.set('views', './views')
app.set('views engine', 'hbs')

app.get("/", (req, res) => {
    let content = productos.list;
    let boolean = content.length !== 0;
    return res.render("layouts/main.hbs", {list: content, showList: boolean});  
})

app.post("/", (req, res) => {      
    let obj = req.body
    let content = productos.list
    let boolean = content.length !==0;
    return res.render("layouts/main.hbs", {list: content, showList: boolean});
});

httpServer.listen(process.env.PORT || 3000, () => {
    console.log("SERVER ON");
  });
  
  /* CHAT */
  io.on("connection", (socket) => {
      socket.emit("messages", messages);
    
      socket.on("new-message", (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit("messages", [data]);
      });

  /* PRODUCTOS */
      socket.on("newProduct", (obj) => {
        productos.insert(obj)
        productos.write()         
        io.sockets.emit('products', [obj])        
      })
    });

