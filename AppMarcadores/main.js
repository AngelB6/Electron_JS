const {app, BrowserWindow, shell } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
        nodeIntegration: true
      }
    })
  
    win.loadFile('index.html');

    mainWindow.webContents.on('will-navigate', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  }
  
app.whenReady().then(() => {
    createWindow()
})