const fs = require('fs')

class Libreria {
    constructor(filename="productos.json") {
        
        this.id = 0
        this.list = []
        this.filename = filename

        this.init()
    }

    init() {
        console.log(`Loading ${this.filename} ...`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)
        for(const obj of listaFromFile) {
            this.insert(obj)
        }
        console.log("File loaded.")
    }

    async find(id){
        let item
        let error = { error : 'producto no encontrado' }
        try {
            item = this.list.find((obj) => obj.id == id)
            if (item){
                console.log("Selected Item: ",item)
                return item
            } else {
                console.log("Selected Item: ",null)
                return error
            }
        } catch (error) {
                console.log(error);
                return error
        }
    }

    insert(obj) {
        obj.id = ++this.id
        this.list.push(obj)

        return obj;
    }

    async update(id, obj){        
        let index 
        let error = { error : 'producto no encontrado' }
        try {
            index = this.list.findIndex((objT) => objT.id == id);
            if (index != -1){
                obj.id = this.list[index].id
                this.list[index] = obj;    
                console.log("Item updated: ",obj)
                return obj
            } else {
                console.log("Item updated: ",null)
                return error
            }
        } catch (error) {
                console.log(error);
                return error
        }
    }

    async delete(id){        
        
        
        let error = { error : 'producto no encontrado' }
        try {
            const object = this.list.find((obj) => obj.id == id);
            if (!object){
                
                return error
            } else {
                this.list = this.list.filter((obj) => obj.id != id)                
                
                return this.list
            }
        } catch (error) {
                
                return error
        }
    }

}

module.exports = Libreria