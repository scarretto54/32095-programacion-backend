const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Libreria = require("./class/contenedor");
const handlebars = require("express-handlebars");
const productos = new Libreria('productos');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = []

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

app.post("/", async (req, res) => {      
    let obj =  req.body
    let content = await productos.getAll()
    let boolean =  content.length !==0;
    return res.render("layouts/main.hbs", {list: content, showList: boolean});
});

    
  io.on("connection", (socket) => {
      console.log('usuario conectado')
  /* CHAT */
      socket.emit("messages", messages);    
      socket.on("new-message", (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit("messages", [data]);
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

  


