
const productosApi = {
    get: () => {
        return fetch('/api/productos')
            .then(data => data.json())            
    },
    getId: (idProd) => {
        const options = {
            method: 'GET',
        }
        return fetch(`/api/productos/${idProd}`)
        .then(data => data.json())  
    },    
    post: (nuevoProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProd)
        }
        return fetch('/api/productos', options)
        
    },
    put: (idProd, producto) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
}
//-------------------------------------------------------------------

actualizarListaProductos()


function sendPost() {
    const nuevoProd = leerProductoDelFormulario()
    productosApi.post(nuevoProd)
    .then(actualizarListaProductos)    
    .then(() => {formAgregarProducto.reset()})

}

function sendPut(idProd) {
    const producto = leerProductoDelFormularioModificacion()
    productosApi.put(idProd, producto)
        .then(actualizarListaProductos())        
        .then(() => {formModificarProducto.reset()})

}

function actualizarListaProductos() {
    return productosApi.get()
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('productos').innerHTML = html
        })
}

function borrarProducto(idProd) {
    productosApi.delete(idProd)
        .then(actualizarListaProductos)
}

function leerProductoDelFormulario() {
    const producto = {
        nombre: formAgregarProducto[0].value,
        descripcion: formAgregarProducto[1].value,
        codigo: formAgregarProducto[2].value,
        foto: formAgregarProducto[3].value,
        precio: formAgregarProducto[4].value,
        stock: formAgregarProducto[5].value,        
        timestamp: Date.now()
    }
    return producto
}

function leerProductoDelFormularioModificacion() {
    const producto = {
        nombre: formModificarProducto[0].value,
        descripcion: formModificarProducto[1].value,
        codigo: formModificarProducto[2].value,
        foto: formModificarProducto[3].value,
        precio: formModificarProducto[4].value,
        stock: formModificarProducto[5].value,
        id: formModificarProducto[6].value,
        timestamp: formModificarProducto[7].value
    }
    return producto
}


function makeHtmlTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <div class="itemlist">
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>                                       
                    <th>Descripcion</th>
                    <th>Informacion</th>                    
                    <th>Opciones</th>
                </tr>`
        for (const prod of productos) {
            html += `
                 <tr>
                    <td><img width="100" src=${prod.foto} alt="not found"></td>
                    <td style="width: 200px">${prod.nombre}</td>                                       
                    <td><div style="width: 200px; height: 100px" class="overflow-auto">${prod.descripcion}</div>
                    <td>                    
                    <div>Precio: ${prod.precio}</div> 
                    <div>Codigo: ${prod.codigo}</div>                   
                    <div>Stock: ${prod.stock}</div>
                    <div>Id: ${prod.id}</div>
                    <div>Timestamp: ${prod.timestamp}</div>                    
                    </td>
                    <td>
                    <div><a type="button" class="btn btn-warning" onclick="modifyProduct('${prod.id}')">Actualizar</a><div>
                    <br>
                    <div><a type="button" class="btn btn-danger"  onclick="borrarProducto('${prod.id}')">Borrar</a><div>
                    </td>
                </tr>`
        }
        html += `
            </table>
        </div >
        </div>`
    }
    return Promise.resolve(html)
}

function modifyProduct(idProd){
    
    let producto = []   
    
    //Me traigo los valores actuales del producto a modificar
    fetch('/api/productos/'+idProd)
    .then( response => response.json())
    .then(data => {
        producto=data
        
        $("#formBotonModificar").html(
            `
            <form id="formModificarProducto" class="container">
            <br>
            <div class="row mb-3">
                <span>Nombre:</span>
                <input type="text" class="form-control" placeholder="Nombre" id="formNombre" name="nombre" title="Nombre del objeto" required>
            </div>
            <div class="row mb-3">
                <span>Descripcion:</span>
                <input type="text" class="form-control" placeholder="Descripcion" id="formDescripcion" name="descripcion" title="Descripcion del objeto" required>
            </div>
            <div class="row mb-3">
                <span>Codigo:</span>
                <input type="text" class="form-control" placeholder="Codigo" id="formCodigo" name="codigo" title="Codigo del objeto" required>
            </div>
            <div class="row mb-3">
                <span>Foto:</span>
                <input type="text" class="form-control" placeholder="Foto" id="formFoto" name="foto" title="URL de foto del objeto" required>
            </div>
            <div class="row mb-3">
                <span>Precio:</span>
                <input type="number" class="form-control" placeholder="Precio" id="formPrecio" name="precio" title="Precio del objeto" required>
            </div>
            <div class="row mb-3">
                <span>Stock:</span>
                <input type="number" class="form-control" placeholder="Stock" id="formStock" name="stock" title="Stock del objeto" required>
            </div>
            <div class="row mb-3">
            <span>Id:</span>
            <input type="text" class="form-control" placeholder="Id" id="formId" name="Id" title="Id del objeto" required>
            </div>
            <div class="row mb-3">
            <span>Timestamp:</span>
            <input type="text" class="form-control" placeholder="Timestamp" id="formTimestamp" name="Timestamp" title="Timestamp del objeto" required>
            </div>
            <button onclick="sendPut('${idProd}')" class="btn btn-warning" value="Actualizar">Cargar Modificación</button>
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
                $("#formId").val(producto.id)
                $("#formTimestamp").val(Date.now())   
                      
        $("#formBotonModificar").get(0).scrollIntoView()
    })

}

function createPost(){
    $("#formBotonModificar").html(
        `
        <form class="container" id="formAgregarProducto">
        <br>
        <div class="row mb-3">
            <span>Nombre:</span>
            <input type="text" class="form-control" placeholder="Nombre" id="formNombre" name="nombre" title="Nombre del objeto" required>
        </div>
        <div class="row mb-3">
            <span>Descripcion:</span>
            <input type="text" class="form-control" placeholder="Descripcion" id="formDescripcion" name="descripcion" title="Descripcion del objeto" required>
        </div>
        <div class="row mb-3">
            <span>Codigo:</span>
            <input type="text" class="form-control" placeholder="Codigo" id="formCodigo" name="codigo" title="Codigo del objeto" required>
        </div>
        <div class="row mb-3">
        <span>Foto:</span>
            <input type="text" class="form-control" placeholder="Foto" id="formFoto" name="foto" title="URL de foto del objeto" required>
        </div>
        <div class="row mb-3">
        <span>Precio:</span>
            <input type="number" class="form-control" placeholder="Precio" id="formPrecio" name="precio" title="Precio del objeto" required>
        </div>
        <div class="row mb-3">
        <span>Stock:</span>
            <input type="number" class="form-control" placeholder="Stock" id="formStock" name="stock" title="Stock del objeto" required>
        </div>              
        <button onclick="sendPost()" class="btn btn-primary" value="crear">Crear Nuevo</button>
        <button onclick="cancelButton()" class="btn btn-danger" value="Modificar">Cancelar</button>
        </form>    
        `)
        $("#formBotonModificar").get(0)
    
    
}

function cancelButton(){
    $("#formNombre").val("")
    $("#formDescripcion").val("")
    $("#formCodigo").val("")
    $("#formFoto").val("")
    $("#formPrecio").val("")
    $("#formStock").val("")
    $("#formId").val("")
    $("#formTimestamp").val("")

    $("#formBotonModificar").html("")
}
