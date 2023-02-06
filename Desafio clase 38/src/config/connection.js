const mongoose = require("mongoose");
const { MONGO_URI } = require("./globals");

exports.getConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return "Conexion correcta!";
  } catch (error) {
    return "Coneccion fallida!";
  }
};
