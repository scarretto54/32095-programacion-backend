const ApiChat = require("../../api/apiChat.js");
const apiChat = new ApiChat();
let messages = [];

async function mensajesSocket(socket, sockets) {

let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length+1
    messages.push(data);

    sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });

}

module.exports = { mensajesSocket }