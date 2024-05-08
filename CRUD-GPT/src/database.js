const mysql = require("mysql2/promise");

let connection;

async function conectarBD() {
  if (!connection) {
    try{ 
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "test"
    });
    console.log("Conectado a la BD");
    console.log("Estado de la conexion:", connection.state);
    }
    catch (error){
      console.error("Error de conexion con la BD: ", error)
      connection = null
    }
  } else {
    console.log("Ya existe una conexion a la BD");
  }
}

module.exports = {
  connection,
  conectarBD,
};
