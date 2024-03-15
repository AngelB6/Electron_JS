const { app, BrowserWindow } = require('electron')
const { setMainMenu } = require('./menu.js')
const path = require('path')

function createWindow(){
  const mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 600,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  setMainMenu(mainWindow)
}

app.whenReady().then(() =>{
  createWindow()
})
