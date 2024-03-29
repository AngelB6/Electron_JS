const { Menu, dialog } = require('electron')


const setMainMenu = (mainWindow) => {
    const template = [
        {
            label: 'Menu',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu:[
                {
                 label: 'Abrir Archivo',
                 click: () =>{
                    dialog.showOpenDialog(mainWindow, {
                        filters: [
                            {
                                name: 'Menu',
                                extensiones: ['md']
                            }
                        ],
                        title: "Slecciona el archivo Markdonw",
                        defaultPath: '~/Desktop',
                        properties: ['openFile', 'openDirectory']
                      })
                 }
                }
            ]
        }
        ,
        {
        label: 'Themes',
            submenu: [
                {
                    label: 'Light',
                    click: () =>{
                        mainWindow.webContents.send('update-theme', 'light')
                    }
                },
                {
                    label: 'Dark',
                    click: () =>{
                        mainWindow.webContents.send('update-theme', 'dark')
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { role: 'forceReload' },
              { role: 'toggleDevTools' },
              { type: 'separator' },
              { role: 'resetZoom' },
              { role: 'zoomIn' },
              { role: 'zoomOut' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ]
          },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports = {
    setMainMenu
}