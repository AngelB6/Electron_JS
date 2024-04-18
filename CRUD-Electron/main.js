const { app, BrowserWindow } = require('electron')

function newWindow(){
    const mainWindow = new BrowserWindow({
        minWidth: 1000,
        minHeight: 600,
    })

    mainWindow.loadFile('index.html')

}

app.whenReady().then(() =>{
    newWindow()
})