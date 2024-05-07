const mysql = require("mysql");

let connection;

function conectarBD() {
  if (!connection) {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "electroncrud",
    });
    connection.connect((err) => {
      if (err) {
        console.error("Error de conexion:", err);
        connection = null;
        return;
      }
      console.log("Conectado a la BD");
    });
  } else {
    console.log("Ya existe una conexion a la BD");
  }
}

module.exports = {
  connection,
  conectarBD,
};
