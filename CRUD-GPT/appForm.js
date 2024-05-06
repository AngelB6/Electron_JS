const backMain = document.getElementById("backMain");

const { ipcRenderer } = require("electron");

backMain.addEventListener("click", () => {
  ipcRenderer.send("cambiarPantalla", "./index.html");
});
