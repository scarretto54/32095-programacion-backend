const { options } = require('../Options/db.js')
const knex = require("knex")(options);

class Libreria {
        
        constructor(tableName) {
            this.table = tableName;
            this.init()
    }

    init() {
          knex.schema.createTableIfNotExists(this.table, table => {
          table.increments("id");
          table.string("title");
          table.integer("price");
          table.string("thumbnail");
          
        })
        .then(() => console.log("DB ON"))
        .catch((err) => {
          console.log(err);
          throw err;
        })
    }

    async getAll(){
        try{
            return await knex.from(this.table).select("*")
        }
        catch(err){
            return `Hubo un error al buscar el elemento ${err}`
        }
    }

    insert(obj) {
        knex(this.table)
        .insert(obj)
        .then(() => console.log("Producto agredado"))
        .catch((err) => {console.log(err);throw err;})        
        return obj
    }

    async find(id){
        let item
        let error = { error : 'producto no encontrado' }
        try{
            item = knex.from(this.table).select("*").where('id', id).limit(1)
            if(!item){
                return error
            }else{
                return item
            }
        }
        catch(err){
            return `Hubo un error al buscar el elemento ${err}`
        }
    }

    async update(id, obj){        
        knex(this.table)
        .where('id', id)    
        .update(obj)    
        .then(() => {
            console.log("Update productos")
        })
        .catch(err => {console.log(err); throw err; })
    }



    async delete(id){ 
        try{
            return await knex(this.table).where('id', id).del()
        }
        catch(err){
            return `Hubo un error al buscar el elemento ${err}`
        }
    }


}

module.exports = Libreria