const { app, Menu } = require('electron')

const setMainMenu = () => {
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
        label: 'Suma',
            submenu: [
                click = () =>{
                    console.log(10);
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports = {
    setMainMenu
}