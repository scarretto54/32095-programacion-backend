export const handleCart = (urlPath) => {
  if (/\/(productos).*/.test(urlPath)) {
    // Add to cart event handler------------------------------------------//
    const productListContainer = document.getElementById("productList");






    const addToCart = async (event) => {
      let carritoStorage = JSON.parse(localStorage.getItem("carrito"));
      console.log(carritoStorage)
      if (event.target.innerText === "Agregar al carrito") {
        const data = {
          _id: event.target.attributes.productid.value,
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
  }
  // Cart methods

  if (urlPath === "/carrito") {
    const cartContainer = document.getElementById("cartContainer");

    const eventHandler = async (event) => {
      if (event.target.id === "removeAll") {
        console.log("DELETE");
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
