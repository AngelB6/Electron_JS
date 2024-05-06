const { connection, conectarBD } = require("./database");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

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

app.whenReady().then(() => {
  createMainWindow(), 
  conectarBD();
});

ipcMain.on("cambiarPantalla", (e, args) => {
  const nuevaPantalla = args;
  mainWindow.loadFile(path.join(__dirname, "view", nuevaPantalla));
});
