const productosApi = {
    get: () => {
        return fetch('/api/productos')
            .then(data => data.json())
    }
}

const carritosApi = {
    crearCarrito: () => {
        const options = { method: "POST" }
        return fetch('/api/carritos', options)
            .then(data => data.json())
    },
    deleteCart: idCarrito => {
        const data = { id: idCarrito }
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carritos/${idCarrito}`, options)
    },
    getIds: () => {
        return fetch('/api/carritos')
            .then(data => data.json())
    },
    postProd: (idCarrito, idProd) => {
        const data = { id: idProd }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carritos/${idCarrito}/productos`, options)
    },
    getProds: idCarrito => {
        return fetch(`/api/carritos/${idCarrito}/productos`)
            .then(data => data.json())
    },
    deleteProd: (idCarrito, idProducto) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`/api/carritos/${idCarrito}/productos/${idProducto}`, options)
    }
}
//-------------------------------------------------------------------

loadComboProductos()

loadComboCarrito()

document.getElementById('btnAgregarAlCarrito').addEventListener('click', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    const idProd = document.getElementById('comboProductos').value
    if (idCarrito && idProd) {
        agregarAlCarrito(idCarrito, idProd)
    } else {
        alert('Debe seleccionar un carrito y un producto')
    }
})
document.getElementById('btnEliminarCarrito').addEventListener('click', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    if (idCarrito) {
        deleteCarrito(idCarrito)
    } else {
        alert('Debe seleccionar un carrito')
    }
})

document.getElementById('btnCrearCarrito').addEventListener('click', () => {
    carritosApi.crearCarrito()
        .then(({ id }) => {
            loadComboCarrito().then(() => {
                const combo = document.getElementById('comboCarritos')
                combo.value = `${id}`
                combo.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById('comboCarritos').addEventListener('change', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    actualizarListaCarrito(idCarrito)
})

function agregarAlCarrito(idCarrito, idProducto) {
    return carritosApi.postProd(idCarrito, idProducto).then(() => {
        actualizarListaCarrito(idCarrito)
    })
}

function deleteCarrito(idCarrito) {
    return carritosApi.deleteCart(idCarrito).then(() => {
        loadComboProductos()
        loadComboCarrito()  
        document.getElementById('list').remove()
    })
}

function quitarDelCarrito(idProducto) {
    const idCarrito = document.getElementById('comboCarritos').value
    return carritosApi.deleteProd(idCarrito, idProducto).then(() => {
        actualizarListaCarrito(idCarrito)
    })
}

function actualizarListaCarrito(idCarrito) {
    return carritosApi.getProds(idCarrito)
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('carrito').innerHTML = html
        })
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
        <div id="list">
        <h2>Productos en Carrito</h2>
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
                    <td><a type="button" class="btn btn-danger" onclick="quitarDelCarrito('${prod.id}')">Borrar</a></td>
                </tr>`
        }
        html += `
            </table>
        </div >
        </div>`
    } else {
        html += `<div id="list"><h2>Carrito sin productos</h2></div>`
    }
    return Promise.resolve(html)
}

function crearOpcionInicial(leyenda) {
    const defaultItem = document.createElement("option")
    defaultItem.value = ''
    defaultItem.text = leyenda
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

function loadComboProductos() {
    return productosApi.get()
        .then(productos => {
            const combo = document.getElementById('comboProductos');
            combo.appendChild(crearOpcionInicial('Elija un Producto'))
            for (const prod of productos) {
                if(prod.stock>0){
                const comboItem = document.createElement("option");
                comboItem.value = prod.id;
                comboItem.text = prod.nombre;                
                combo.appendChild(comboItem);
            }
            }
        })
}

function vaciarCombo(combo) {
    while (combo.childElementCount > 0) {
        combo.remove(0)
    }
}

function loadComboCarrito() {
    return carritosApi.getIds()
        .then(ids => {
            const combo = document.getElementById('comboCarritos');
            vaciarCombo(combo)
            combo.appendChild(crearOpcionInicial('Elija un Carrito'))
            for (const id of ids) {
                const comboItem = document.createElement("option");
                comboItem.value = id;
                comboItem.text = id;
                combo.appendChild(comboItem);
            }
        })
}
