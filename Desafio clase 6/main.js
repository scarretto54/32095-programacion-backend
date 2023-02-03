const Contenedor = require("./contenedor.js");
const express = require("express");
const app = express();
app.listen(process.env.PORT || 8080);


  const cc = new Contenedor("productos.json");

  cc.init();

  let lista = cc.getAll();
  console.log("Tamaño: ", lista.length);

  let id = cc.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
  });
  console.log("Nuevo item con id: ", id);
  id =  cc.save({
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
  });
  console.log("Nuevo item con id: ", id);
  id =  cc.save({
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
  });
  console.log("Nuevo item con id: ", id);

  lista = cc.getAll();
  console.log("Tamaño: ", lista);


app.get("/", (req, res) => {
  res.send(
    '<h2>Hola, ingrese a <a href="/productos"> /productos </a> para acceder a todos los productos o <a href="/productoRandom"> /productoRandom </a> para obtener un producto aleatorio.</h2>'
  );
});
app.get("/productos", (req, res) => {
  res.json(lista);
});
app.get("/productoRandom", (req, res) => {
  //obtener un producto aleatorio de listaProductos
  let productoAleatorio = lista[Math.floor(Math.random() * lista.length)];
  res.json(productoAleatorio);
});