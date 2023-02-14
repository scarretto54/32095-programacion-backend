export const handleAddProduct = (urlPath) => {
  if (urlPath === "/agregar-productos") {
    let form = document.getElementById("form");

    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      try {
        const formData = new FormData(form);
        await fetch("/api/productos", {
          method: "POST",
          redirect: "manual",
          body: formData,
        }).then((res) => {
          // console.log(res);
          if (!res.ok) {
            throw new Error("Network response was not OK");
          }
          if (res.ok) {  
            Swal.fire({
              title: '<strong>¡Genial!</strong>',
              icon: 'success',
              html:
                '<b>El producto se ha creado correctamente.</p>',
              focusConfirm: false,
              confirmButtonText:
                '<a href="/agregar-productos" class="text-decoration-none text-white mt-4">OK</a>',
              confirmButtonAriaLabel: 'Genial!',
              allowOutsideClick: ""
            });
          }
        });
      } catch (error) {
        console.trace(error);
      }
    });
  }
};
