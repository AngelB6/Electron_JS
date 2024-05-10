// Importaciones necesarias para el correcto funcionamiento del main process
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const mysql = require("mysql");

// Declaracion y configuracion de la ventana que se creara cuando se inicie la aplicacion
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
  });
  const indexPath = path.join(__dirname, "view", "index.html");
  mainWindow.loadFile(indexPath);
}

// Declaracion y configuracion de la BD para su conexion
let connection;

function conectarBD() {
  if (!connection) {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "electroncrud"
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error de conexion con la BD:", err);
        connection = null;
        return;
      }
      console.log("Conectado a la BD");
    });
  } else {
    console.log("Ya existe una conexion a la BD");
  }
}

app.whenReady().then(async () => {
  createMainWindow();
  await conectarBD();
});

// Data recibida desde el renderer process y su tratamiento para la insercion a la base de datos
ipcMain.on("dataSet", async (e, data) => {
  console.log("Recbio datos", data);

  if (connection && connection.state === "authenticated") {
    const sql = "INSERT INTO servicio (fechaCliente, nomCliente, numRef, monedaCotizacion, tipoServicio, estatusCliente, volumen, categoriaCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      data.fechaServ,
      data.nomClie,
      data.numRef,
      data.monedaCoti,
      data.tipoServ,
      data.estatusClie,
      data.vol,
      data.categoCliente,
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al insertar los datos en la BD: ", err);
        return;
      }
      console.log("Datos insertados correctamente en la BD");
    });
  } else {
    console.error("La conexion con la BD no esta disponible");
  }
});

// Recibimos la solicitud de cambio de pantalla desde el renderer process por medio de una variable que es asignada a una constante
ipcMain.on("cambiarPantalla", (e, args) => {
  const nuevaPantalla = args;
  mainWindow.loadFile(path.join(__dirname, "view", nuevaPantalla));
});
