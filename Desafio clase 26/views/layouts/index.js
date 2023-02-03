
const socket = io.connect();
let products = []

function renderChat(data) {
  data.forEach((info) => {
    $("#messages").prepend(`
      <div>
      <img class="avatar" alt="jonrohan" src="${info.author.avatar}" width="48" height="48"/><em class="text-primary fw-bold"> ${info.author.alias}</em>
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
    <td><img src="${info.thumbnail}" style="height:10rem;"  alt="..."></td>
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
  let time = new Date().toLocaleString();
  const message = {
    author: {
      id: $("#id").val(),
      name: $("#name").val(),
      lastname: $("#lastname").val(),
      age: Number($("#age").val()),
      alias: $("#alias").val(),
      avatar: $("#avatar").val(),
    },
    text: $("#text").val(),
    time: time
  };

  socket.emit("new-message", message);

  $("#text").val("")

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

     $("#title").val(""),
     $("#price").val(""),
     $("#thumbnail").val("")

});




