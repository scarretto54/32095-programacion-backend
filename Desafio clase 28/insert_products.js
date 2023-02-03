const { options } = require('./Options/db.js')
const knex = require('knex')(options)
/* PRODUCTOS - CARGAR LISTADO*/
const productos = [
    {        
        title: "Padre Rico, Padre Pobre",
        price: 1259.00,
        thumbnail: "https://imagessl5.casadellibro.com/a/l/t7/25/9788466332125.jpg"
    },
    {        
        title: "Los Cuatro Acuerdos",
        price: 1750,
        thumbnail: "https://imagessl6.casadellibro.com/a/l/t7/36/9788479532536.jpg"
    }
  ]

  knex('productos').insert(productos)
  .then(() => console.log("data inserted"))
  .catch(err => {console.log(err); throw err; })
  .finally(() => {
      knex.destroy();
  })


