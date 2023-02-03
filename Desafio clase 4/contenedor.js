const fs = require('fs')

class Contenedor {
    constructor(filename) {
        
        this.countID = 0
        this.file = filename
        this.lista = []

    }

    async write() {
        let string = JSON.stringify(this.lista)
        await fs.promises.writeFile(this.file, string)
    }

    async init() {
        try {
            let data = await fs.promises.readFile(this.file)
            this.lista = JSON.parse(data)
            
            for(const element of this.lista) {
                if(element.id > this.countID) this.countID = element.id
            }

            console.log("Last ID: ", this.countID)
        } catch (error) {
            console.log("Aun no hay archivo")
        }
    }

    async save( objeto ) {
        try{
        this.countID++;
        objeto["id"] = this.countID

        this.lista.push(objeto)

        await this.write()

        return this.countID;
        }
        catch(error){
            console.log('Ocurrio un error al guardar el datos en el archivo '+error)            
        }
    }

    getAll() {
        return this.lista
    }

    getByID(id){
        
        
        let item

        try {
                
            item = this.lista.find(element => element.id==id)
    
            if (item){
                console.log("Selected Item: ",item) 
                return item
            } else {
                console.log("Selected Item: ",null) 
                return null
            }
        } catch (error) {
            console.log("Error al obtener id: " + error);
        }
    }

    async deleteAll(){

        try {
            this.lista = []
            await this.write()           
            console.log('Se borro correctamente')
        }catch(error){
            console.log('No se pudo escribir el archivo' + error)
            }
        }

    async deleteById(id) {

        
        this.lista = this.lista.filter(element => element.id != id)

        await this.write()

        console.log("Se elimino el idem ID: ",id) 
    }
}


module.exports = Contenedor
