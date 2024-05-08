const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { conectarBD, connection } = require("./database");

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

app.whenReady().then(async () => {
  createMainWindow();
  await conectarBD();
});

ipcMain.on("dataSet", async (e, data) => {
  console.log("Recbio datos", data);

  if (connection && connection.state === "authenticated") {
    try {
      const [rows, fields] = await connection.execute(
        "INSERT INTO servicio (fechaServ, nomClie, numRef, monedaCoti, tipoServ, estatusClie, vol, categoCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.fechaServ,
          data.nomClie,
          data.numRef,
          data.monedaCoti,
          data.tipoServ,
          data.estatusClie,
          data.vol,
          data.categoCliente,
        ]
      );
      console.log("Datos insertados correctamente en la BD");
    } catch (error) {
      console.error("Error al insertar los datos en la BD: ", error);
    }
  } else {
    console.error("La conexion con la BD no esta disponible");
  }
});

ipcMain.on("cambiarPantalla", (e, args) => {
  const nuevaPantalla = args;
  mainWindow.loadFile(path.join(__dirname, "view", nuevaPantalla));
});
