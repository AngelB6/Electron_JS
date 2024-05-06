const { connection, conectarBD } = require("./database");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

conectarBD();

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
  mainWindow.loadFile("./index.html");
}

app.whenReady().then(createMainWindow);

ipcMain.on("cambiarPantalla", (e, args) => {
  const nuevaPantalla = args;
  mainWindow.loadFile(path.join(__dirname, nuevaPantalla));
});
