import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        // super('productos', {
        //     title: { type: String, required: true },
        //     price: { type: Number, required: true },
        //     thumbnail: { type: String, required: true },
        //     id: {type: Number, required:true }
        // })

        super('productos', {
            nombre: {type:String, required:true},
            descripcion: {type:String},
            codigo: {type:Number, required:true},
            foto: {type:String},
            precio: {type:Number, required:true},
            stock: {type:Number, required:true},
            id: {type:String, required:false},
            timestamp: {type:String, required:false}
        })
    }
}

export default ProductosDaoMongoDb
