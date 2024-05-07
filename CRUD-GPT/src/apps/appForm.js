const formServicio = document.getElementById("setFormServicio");
const backMain = document.getElementById("backMain");

const { ipcRenderer } = require("electron");

formServicio.addEventListener("click", () =>{
  console.log("Hello world!");
})

backMain.addEventListener("click", () => {
  ipcRenderer.send("cambiarPantalla", "../view/index.html");
});
