
let productos = []
const error = {'error':'producto no encontrado'}

const USADM = true

//Me traigo los productos con Fetch
 function fetchProducts() {
    const id = $("#idProducto").val()
        
   $(".itemlist").remove()
    fetch('/api/productos/'+id)    
    .then( response => response.json())    
    .then(data => {
        productos=data
        if(id==""){
            renderList(productos)
        }
        else{
            renderProduct(productos)
        } 
        })
    //$("#list").append('producto no encontrado')
   }

function renderList(data) {    
    
    data.forEach(function(data){
        $("#list").append(
            `
            <div class="d-inline-flex p-2 itemlist" >
                <div class="card" style="width: 15rem;">
                    <img src="${data.foto}" style="height:18rem;" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.nombre}</h5>
                        <p class="card-text">id:${data.id}</p>
                        <p class="card-text">${data.descripcion}</p>
                        <p class="card-text">Codigo: ${data.codigo}</p>
                        <p class="card-text">Precio: ${data.precio}</p>
                        <p class="card-text">Stock: ${data.stock}</p>
                        <span class="modifyButtons">
                            <button onclick="modifyProduct(${data.id})" class="btn btn-primary">Actualizar</button>
                            <button onclick="deleteProduct(${data.id})" class="btn btn-danger">Eliminar</button>
                        </span>
                    </div>
                </div>
            </div>
            `
        )
    })

    if(!USADM){
        $(".modifyButtons").html("")
    }
}

function renderProduct(data) {       
    if(data.id!=undefined) {
       $("#list").append(
            `
            <div class="d-inline-flex p-2 itemlist" >
                <div class="card" style="width: 15rem;">
                    <img src="${data.foto}" style="height:18rem;" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.nombre}</h5>
                        <p class="card-text">id:${data.id}</p>
                        <p class="card-text">${data.descripcion}</p>
                        <p class="card-text">Codigo: ${data.codigo}</p>
                        <p class="card-text">Precio: ${data.precio}</p>
                        <p class="card-text">Stock: ${data.stock}</p>
                        <span class="modifyButtons">
                            <button onclick="modifyProduct(${data.id})" class="btn btn-primary">Actualizar</button>
                            <button onclick="deleteProduct(${data.id})" class="btn btn-danger">Eliminar</button>
                        </span>
                    </div>
                </div>
            </div>
            `
        )}
        else{$("#list").append(
            `
            <div class="d-inline-flex p-2 itemlist" >
            <div class="card" >
            <div class="card-body" >
            <h5 class="card-title">Producto no encontrado</h5>   
            </div>         
            </div>
            </div>
            `
            )}
    
    if(!USADM){
        $(".modifyButtons").html("")
    }
}

function modifyProduct(id){
    let producto = []
    
    //Me traigo los valores actuales del producto a modificar
    fetch('/api/productos/'+id)
    .then( response => response.json())
    .then(data => {
        producto=data



        $("#formBotonModificar").html(
            `
            <form class="container" onsubmit="sendPut(${id})">
            <br>
            <div class="row mb-3">
                <input type="text" class="form-control" placeholder="Nombre" id="formNombre" name="nombre" title="Nombre del objeto" required>
            </div>

            <div class="row mb-3">
                <input type="text" class="form-control" placeholder="Descripcion" id="formDescripcion" name="descripcion" title="Descripcion del objeto" required>
            </div>

            <div class="row mb-3">
                <input type="text" class="form-control" placeholder="Codigo" id="formCodigo" name="codigo" title="Codigo del objeto" required>
            </div>

            <div class="row mb-3">
                <input type="text" class="form-control" placeholder="Foto" id="formFoto" name="foto" title="URL de foto del objeto" required>
            </div>

            <div class="row mb-3">
                <input type="number" class="form-control" placeholder="Precio" id="formPrecio" name="precio" title="Precio del objeto" required>
            </div>
            <div class="row mb-3">
                <input type="number" class="form-control" placeholder="Stock" id="formStock" name="stock" title="Stock del objeto" required>
            </div>
            <button type='submit' class="btn btn-warning" value="Modificar">Modificar</button>
            <button onclick="cancelButton()" class="btn btn-danger" value="Modificar">Cancelar</button>
        </form>

            `)
        
                //Con los valores de producto recuperados, llenamos la tabla de modificacion
                $("#formNombre").val(producto.nombre)
                $("#formDescripcion").val(producto.descripcion)
                $("#formCodigo").val(producto.codigo)
                $("#formFoto").val(producto.foto)
                $("#formPrecio").val(producto.precio)
                $("#formStock").val(producto.stock)  

        $("#formBotonModificar").get(0).scrollIntoView()
    })

}

function deleteProduct(id) {   
    
    multiusageFetch(id, "DELETE", null, "Borrado exitoso.")
}

function sendPut(id){   
    const data = getFormData(null)
    multiusageFetch(id, "PUT", data, "Modificacion exitosa.")
 
}

function createPost(){
    $("#formBotonModificar").html(
        `
        <form class="container" onsubmit="sendPost()">
        <br>

        <div class="row mb-3">
            <input type="text" class="form-control" placeholder="Nombre" id="formNombre" name="nombre" title="Nombre del objeto" required>
        </div>

        <div class="row mb-3">
            <input type="text" class="form-control" placeholder="Descripcion" id="formDescripcion" name="descripcion" title="Descripcion del objeto" required>
        </div>

        <div class="row mb-3">
            <input type="text" class="form-control" placeholder="Codigo" id="formCodigo" name="codigo" title="Codigo del objeto" required>
        </div>

        <div class="row mb-3">
            <input type="text" class="form-control" placeholder="Foto" id="formFoto" name="foto" title="URL de foto del objeto" required>
        </div>

        <div class="row mb-3">
            <input type="number" class="form-control" placeholder="Precio" id="formPrecio" name="precio" title="Precio del objeto" required>
        </div>

        <div class="row mb-3">
            <input type="number" class="form-control" placeholder="Stock" id="formStock" name="stock" title="Stock del objeto" required>
        </div>              
        <button  type='submit'  class="btn btn-primary" value="crear">Crear Nuevo</button>
        <button onclick="cancelButton()" class="btn btn-danger" value="Modificar">Cancelar</button>
    </form>
    
        `)
        $("#formBotonModificar").get(0)
    
    
}

function sendPost() {
    const data = getFormData()
    multiusageFetch(null, "POST", data, "Nuevo producto creado satisfactoriamente.")

}

function getFormData(id) {
    //Obtenemos la data del form en formato JSON
    var formData = $('form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    const data = {...formData,
        id:id,
        timestamp:Date.now()
    }

    return data
}


function multiusageFetch(id, method, data, successMessage) {
    let path = ""
    let body = ""

    if(id==null){
        path = '/api/productos'
    }else{
        path = '/api/productos/'+id
    }

    if(data==null){
        body=""
    }else{
        body=JSON.stringify(data)
    }

    fetch(path, {
        method:method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then( () => {
       window.alert(successMessage)
    window.location.reload()
    })
    .catch(err => {
        console.log(err)   
    })
} 

function cancelButton(){
    $("#formNombre").val("")
    $("#formDescripcion").val("")
    $("#formCodigo").val("")
    $("#formFoto").val("")
    $("#formPrecio").val("")
    $("#formStock").val("")

    $("#formBotonModificar").html("")
}

//Llenamos la lista con este proceso
fetchProducts()