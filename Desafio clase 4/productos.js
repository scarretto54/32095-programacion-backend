const Contenedor = require('./contenedor.js')

const run = async function() {
    const cc = new Contenedor("productos.json")

    await cc.init()


    let lista = cc.getAll()
    console.log("Tamaño: ", lista.length)

    let id = await cc.save({                                                                                                                                                    
        title: 'Escuadra',                                                                                                                                 
        price: 123.45,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                          
    })
    console.log("Nuevo item con id: ", id)
    id = await cc.save({                                                                                                                                                    
        title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                                                                                        
    })
    console.log("Nuevo item con id: ", id)
    id = await cc.save({                                                                                                                                                    
        title: 'Globo Terráqueo',                                                                                                                          
        price: 345.67,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'                                                                                                                                         
    })
    console.log("Nuevo item con id: ", id)  

    lista = cc.getAll()
    console.log("Tamaño: ", lista)
};

const run2 = async function() {
 
    const cc = new Contenedor("productos.json")

    await cc.init()
    
    await cc.getByID('2')
    
};

const run3 = async function() {
 
    const cc = new Contenedor("productos.json")

    await cc.init()
    
    await cc.deleteById('2')
    
};

const run4 = async function() {
 
    const cc = new Contenedor("productos.json")

    await cc.init()
    
    await cc.deleteAll()
    
};

run();
run2();
run3();
run4();
