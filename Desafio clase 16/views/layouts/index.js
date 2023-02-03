
let username = sessionStorage.getItem("username");
if (!username) {
  username = prompt("Ingrese email");
}
$("#username").html(username);

const socket = io.connect();
let products = []



function renderChat(data) {
  data.forEach((info) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${info.author}</em>
          [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
      </div>
    `);
  });
}
function renderProducts(obj) {
  obj.forEach((info) => {
     $("#list").append(`
    <tr>    
    <td>${info.title}</td>
    <td>${info.price}</td>
    <td>${info.thumbnail}</td>
    </tr>
    `);
  });
}


//Para el form de Chat
socket.on("messages", (data) => {  
  renderChat(data);
});

$('#myChat').on('submit', e => {
  e.preventDefault();

  const message = {
    author: username,
    text: $("#text").val()
  };

  socket.emit("new-message", message);
});

//Para el form de ingreso de datos
socket.on('products', obj => {  
  renderProducts(obj)  
})

$("#postProd").on('submit', e => {
  e.preventDefault()

  obj = {
      title: $("#title").val(),
      price: $("#price").val(),
      thumbnail: $("#thumbnail").val()
  }
  
   socket.emit("newProduct", obj)
});




