require("electron-reload")(__dirname);
const { app, BrowserWindow, ipcMain } = require("electron");
const { getConnection } = require("./database");
const path = require("path");

function hello() {
  console.log("Hello World");
  //   const conn = getConnection();
  //   console.log(product);
}

ipcMain.on("hello", (e, arg) => {
  hello();
});

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.loadFile("src/ui/index.html");
}

app.whenReady().then(createWindow);

module.exports = {
  createWindow,
  hello,
};
