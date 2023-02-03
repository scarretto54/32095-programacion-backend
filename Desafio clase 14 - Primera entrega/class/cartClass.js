const fs = require('fs')

const error = {'error':'producto no encontrado'}
const error2 = {'error':'carrito no encontrado'}

class CartClass {
    constructor(nombreArchivo) {
        this.id = 0
        this.list = []
        this.filename = nombreArchivo
        this.init()
    }

    init(){
        console.log(`Loading ${this.filename} ...`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)
        for(const obj of listaFromFile) {
            this.list.push(obj)
        }
        console.log("File loaded.")

        //Buscamos el id mas alto para inicializar el this.id
        const listId = this.list.map(obj => {
            return obj.id
        })
            this.id = 0 
         if(listId.length!==0) {
            const maxId = Math.max(...listId)
            this.id=maxId
         }

         }

    find(id){
        const object = this.list.find((obj) => obj.id == id)

        if(!object){
            return error
        }else{
            return object
        }
    }

    update(id, obj){
        const index = this.list.findIndex((objT) => objT.id == id)

        if(index==-1){
            return error
        }else{
            obj.id = this.list[index].id
            this.list[index] = obj
    
            return obj
        }

    }

    delete(id){

        const object = this.list.find((obj) => obj.id == id)

        if(!object){
            return error
        }else{
            this.list = this.list.filter((obj) => obj.id != id)
            return this.list
        }

    }

    async write(){
        try{
            await fs.promises.writeFile(this.filename,JSON.stringify(this.list))

        } catch (err) {
            console.log('no se pudo escribir el archivo ' + err)
        }
    }

    //For Cart Purposes
    cartCreate(obj){
                 
        const listId = this.list.map(obj => {
            return obj.id
        })
            this.id = 0 
         if(listId.length!==0) {
            const maxId = Math.max(...listId)
            this.id=maxId
         }
       

        obj.id = ++this.id
        obj.timestamp = Date.now()
        obj.productos= []

        //Pusheamos el cart
        this.list.push(obj)
        return obj.id
    }

    cartInsert(cartId,obj) {
       
        //Buscamos el index del id del cart
        const index = this.list.findIndex((objT) => objT.id == cartId)
        if(index==-1){
            return error2
        }else{
        if(this.list[index].productos.length == 0) {
            obj.id = 1
        } else {
            //Buscamos el maximo id de productos dentro del cart
            const idProductsInCart = this.list[index].productos.map(obj => {
                return obj.id
            })
            const maxIdProducts = Math.max(...idProductsInCart)
            obj.id = maxIdProducts + 1
        }
        
        obj.timestamp = Date.now()

        //Pusheamos el producto 
        this.list[index].productos.push(obj)
        
        return obj
        }
    }

    cartDelete(cartId,prodId) {
        const cartSearch = this.list.findIndex((obj) => obj.id == cartId)

        if(cartSearch<0){
            return error2
        }

        const prodSearch = this.list[cartSearch].productos.findIndex((obj) => obj.id == prodId)

        if(prodSearch<0) {
            return error2
        }

        this.list[cartSearch].productos.splice(prodSearch, 1)

        return prodId
        
    }
}

module.exports = CartClass
