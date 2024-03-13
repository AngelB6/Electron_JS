const { app, BrowserWindow } = require('electron')
const { setMainMenu } = require('./menu.js')

function createWindow(){
  const window = new BrowserWindow({
    minWidth: 1200,
    minHeight: 600
  })

  window.loadFile('index.html')
}

setMainMenu()

app.whenReady().then(() =>{
  createWindow()
})
