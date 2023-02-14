const mongoose = require("mongoose");
const { MONGO_URI } = require("./globals");

exports.getConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return "Conexion DB correcta!";
  } catch (error) {
    return "Coneccion DB fallida!";
  }
};
