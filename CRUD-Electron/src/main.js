require('electron-reload')(__dirname);
const { app, BrowserWindow } = require("electron");
const { getConnection } = require("./database");


function createProduct(product) {
  const conn = getConnection();
  console.log(product);
}

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  });
  window.loadFile("src/ui/index.html");
}

app.whenReady().then(createWindow)

module.exports = {
  createWindow,
  createProduct,
};
