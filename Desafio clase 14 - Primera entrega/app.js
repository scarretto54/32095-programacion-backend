const express = require('express')
const productsClass = require('./class/productsClass.js')
const CartClass = require('./class/cartClass.js')
const { Server: HttpServer } = require("http");
const {Router} = express
const routerProduct = Router()
const routerCart = Router()

const app = express()
const PORT = 8080
const USADM = true
const httpServer = new HttpServer(app);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./views'))


const products = new productsClass(__dirname + '/data/productos.json')
const cart = new CartClass(__dirname + '/data/carrito.json')


//Router base /api/productos
routerProduct.get("/", (req, res) => {
    let list = products.list
    return res.json(list)
})

//Funcionalidad a:  GET /:id --> Devuelve un producto segun su ID || para users y admins
routerProduct.get("/:id", (req, res) => {
    let id = req.params.id
    let list = products.find(id)
    return res.json(list)
})

//Funcionalidad b: POST / --> Incorpora productos al listado || solo admins
routerProduct.post("/", checkAdm, (req, res) => {
    let obj = req.body
    let post = products.insert(obj)
    products.write()
    return res.json(post)
})

//Funcionalidad c: PUT /:id --> Actualiza un producto segun su id || solo admins
routerProduct.put("/:id", checkAdm, (req, res) => {
    let obj = req.body
    let id = req.params.id
    let put = products.update(id,obj)
    products.write()
    return res.json(put)
})

//Funcionalidad d: Borra un producto segun su ID || solo admins
routerProduct.delete("/:id", checkAdm, (req,res) => {
    let id = req.params.id
    let deleted = products.delete(id)
    products.write()
    return res.json(deleted)
})

//Router base /api/carrito
//Funcionalidad extra: GET / --> obtiene el listado de carritos || usuarios y admins
routerCart.get("/", (req, res) => {

    return res.json(cart.list)
})

//Funcionalidad a: POST / --> Crea un carrito y devuelve su id || usuarios y admins
routerCart.post("/", (req, res) => {
    let obj = req.body
    let create = cart.cartCreate(obj)
    cart.write()
    return res.json(create)
})

//Funcionalidad b: DELETE /:id --> Vacia un carrito y lo elimina || usuarios y admins
routerCart.delete("/:id", (req,res) => {
    let id = req.params.id
    let deleted = cart.delete(id)
    cart.write()
    return res.json(deleted)
})

//Funcionalidad c: GET /:id/productos --> Permite listar todos los productos del carrito || usuarios y admins
routerCart.get("/:id/productos", (req, res) => {
    let id = req.params.id
    return res.json(cart.find(id).productos)
})

//Funcionalidad d: POST: /:id/productos --> Incorpora productos al carrito por id de carrito? || usuarios y admins
routerCart.post("/:id/productos", (req, res) => {
    let obj = req.body
    let id = req.params.id       
    let post = cart.cartInsert(id,obj)
    cart.write()
    return res.json(post)
})

//Funcionalidad e: DELETE: /:id/productos/:id_prod --> Elimina un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:idprod", (req,res) => {
    let idCart = req.params.id
    let idProd = req.params.idprod
    let deleted = cart.cartDelete(idCart, idProd)
    cart.write()
    return res.json(deleted)
})

app.use('/api/productos', routerProduct)
app.use('/api/carrito', routerCart)

//Listening

httpServer.listen(process.env.PORT || PORT, () => {
    console.log("SERVER ON");
  });


//Manejador de errores
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send('Ocurrio un error: '+err)
})

app.use(function(req,res,next) {

    const error = {
        error:-2,
        descripcion:`ruta ${req.path} metodo ${req.method} no implementado.`
    }
    res.status(500).send(error)
})

//Middleware de seguridad
function checkAdm(req,res,next){
    if(USADM){
        next()
    }else{
        const error={
            error:-1,
            descripcion: `Ruta ${req.url} metodo ${req.method} no autorizado.`
        }
        res.status(500).send(error)
    }
}
