    class Usuario{
        constructor(id, nombre, apellido, libros=[], mascotas=[]){
            
            this.id = id
            this.nombre=nombre
            this.apellido=apellido
            this.libros=libros
            this.mascotas=mascotas        
        }    
        getFullName(){
            return `${this.nombre} ${this.apellido}`
        }    
        addMascota(nombreMascota){
            this.mascotas.push(nombreMascota)
        }    
        countMascotas(){
            return this.mascotas.length
        }    
        addBook(nombreLibro, autorLibro){
            this.libros.push({'nombre':nombreLibro, 'autor':autorLibro})
        }    
        getBookNames(){
            return this.libros.map(libro=>libro.nombre)
        }
    }
    
    usser1=new Usuario('1', 'Santiago','Carretto')    
    usser2=new Usuario('2', 'Francisco','Castillo',[{'nombre':'El general en su laberinto', 'autor':'Gabriel García Márquez'}])
    usser3=new Usuario('3', 'Cordelia','Andrada',[{'nombre':'El gato negro', 'autor':'Edgar Allan Poe'},{'nombre':'El cuervo', 'autor':'Edgar Allan Poe'}],['Jacinto', 'Manchas'])
    
    usser1.addBook('Harry Potter y la Piedra Filosofal', 'J.K. Rowling')
    usser1.addMascota('Panchita')
    
    console.log(usser1.getFullName())
    console.log(usser1.countMascotas())
    console.log(usser1.getBookNames())
    console.log(usser2.getFullName())
    console.log(usser2.countMascotas())
    console.log(usser2.getBookNames())
    console.log(usser3.getFullName())
    console.log(usser3.countMascotas())
    console.log(usser3.getBookNames())


    
