const fs = require('fs')

const error = {'error':'producto no encontrado'}


class productsClass {
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
            this.insert(obj)
        }
        console.log("File loaded.")

        //Buscamos el id mas alto para inicializar el this.id
        const listId = this.list.map(obj => {
            return obj.id
        })
        const maxId = Math.max(...listId)
        this.id=maxId
         }

    insert(obj) {
        obj.id = ++this.id
        obj.timestamp = Date.now()
        this.list.push(obj)

        return obj
        
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

}

module.exports = productsClass
