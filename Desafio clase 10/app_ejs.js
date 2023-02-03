const express = require("express");
const Libreria = require("./class/contenedor");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Libreria(__dirname + "/data/productos.json");

app.set('views', './views/ejs')
app.set('views engine', 'ejs')

app.get("/", (req, res) => {
    let content = productos.list
    return res.render('index.ejs', {content})    
})

app.get("/productos", (req, res) => {
    let content = productos.list
    let boolean = content.length !==0
    //console.log(content);
    return res.render('productos.ejs', {content});
});

app.get("/:id", (req, res) => {
    let id = req.params.id    
    let content = productos.find(id)
    return res.render('index.ejs', {content})    
})

app.post("/productos", (req, res) => {      
    let obj = req.body
    productos.insert(obj)
    let content = productos.list
    let boolean = content.length !==0
    return res.render('productos.ejs', {content});
});

app.put("/:id", (req, res) => {
    let obj = req.body
    let id = req.params.id
    return res.render(productos.update(id, obj))
})
app.delete("/:id", (req, res) => {
    let id = req.params.id
    return res.render(productos.delete(id))
})

app.listen(5000);