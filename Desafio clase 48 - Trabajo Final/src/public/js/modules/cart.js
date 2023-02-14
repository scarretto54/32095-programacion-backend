export const handleCart = (urlPath) => {
  if (/\/(productos).*/.test(urlPath)) {
    // Add to cart event handler------------------------------------------//
    const productListContainer = document.getElementById("productList");

    let quantityItem = 1;
   
    const onAddQty = (event) => {      
      if (event.target.innerText === "+") {
       if(quantityItem < Number(document.getElementById("stock").getAttribute('value'))) {
        quantityItem = quantityItem + 1 
        return document.getElementById("quantityItem").setAttribute('value', quantityItem )        
      }
    }
  } 

  const onRemoveQty = (event) => {      
    if (event.target.innerText === "-") {
     if(quantityItem > 1) {
      quantityItem = quantityItem - 1 
      return document.getElementById("quantityItem").setAttribute('value', quantityItem )        
    }
  }
} 


    const addToCart = async (event) => {
      let carritoStorage = JSON.parse(localStorage.getItem("carrito"));
      
      if (event.target.innerText === "Agregar al carrito") {
        const data = {
          _id: event.target.attributes.productid.value,
          name: document.getElementById("name").getAttribute('value'),
          description: document.getElementById("description").getAttribute('value'),
          category: document.getElementById("category").getAttribute('value'),
          imageURL: document.getElementById("imageURL").getAttribute('value'),
          price: Number(document.getElementById("price").getAttribute('value')),
          stock: Number(document.getElementById("stock").getAttribute('value')),
          cod: Number(document.getElementById("cod").getAttribute('value')),
          qty: Number(document.getElementById("quantityItem").getAttribute('value')),
          timestamps: Number(document.getElementById("timestamps").getAttribute('value')),
        };
        if (carritoStorage === null || carritoStorage.length === 0) {
          console.log("POST");
          await fetch("/api/carrito", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("carrito", JSON.stringify(data));
              Swal.fire("Genial", "Producto añadido correctamente", "success");
            });
        } else {
          console.log("PUT");
          await fetch("/api/carrito", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("carrito", JSON.stringify(data));
              Swal.fire("Genial", "Producto añadido correctamente", "success");
            });
        }
      }
    };

    productListContainer.addEventListener("click", addToCart);
    productListContainer.addEventListener("click", onAddQty);
    productListContainer.addEventListener("click", onRemoveQty);
  }

  // Cart methods

  if (urlPath === "/carrito") {
    const cartContainer = document.getElementById("cartContainer");

    const eventHandler = async (event) => {
      if (event.target.id === "removeAll") {
        console.log("DELETE");
        console.log(localStorage.getItem("carrito"))
        await fetch("/api/carrito", {
          method: "DELETE",
        }).then((res) => (window.location.href = "/carrito"));
        localStorage.removeItem("carrito");
      }

      if (event.target.id === "checkOut") {
        console.log("POST");
        const total = document.getElementById("totalOrder").innerHTML;
        const productosStorage = JSON.parse(localStorage.getItem("carrito"));
        productosStorage.total = Number(total);
        await fetch("/api/ordenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productosStorage),
        }        
        ).then(async (res) => {
          console.log("DELETE");
          await fetch("/api/carrito", {
            method: "DELETE",
          }).then((res) => {
           localStorage.removeItem("carrito");                      
            Swal.fire({
              title: '<strong>Tu orden se genero con exito</strong>',
              icon: 'success',
              html:
                '<b>Gracias por elegirnos !</b><p>Recibiras tu orden por correo y whatsapp</p>',
              focusConfirm: false,
              confirmButtonText:
                '<a href="/" class="text-decoration-none text-white mt-4">OK</a>',
              confirmButtonAriaLabel: 'Genial!',
              allowOutsideClick: ''
            })  
          });
        });
        
      }
    };

    cartContainer.addEventListener("click", eventHandler);
  }
};
