const homeWebRouter = require("express").Router();
const  isAuth = require('../../auth/index.js')

const Libreria = require('../../class/contenedorMySQL');
const productos = new Libreria('productos');

const ApiProductos = require('../../api/apiProductos.js');
const apiProductos = new ApiProductos();


// Main
homeWebRouter.get("/", isAuth.isAuth, async (req, res) => {      
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
 
 homeWebRouter.get("/productos-test", isAuth.isAuth, async (req, res) => {
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
 
 homeWebRouter.post("/", isAuth.isAuth, async (req, res) => {
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
 
 module.exports =  homeWebRouter;