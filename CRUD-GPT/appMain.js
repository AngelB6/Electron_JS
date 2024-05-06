const buttFormulario = document.getElementById("btnFormulario");

const { ipcRenderer } = require("electron");

buttFormulario.addEventListener("click", () => {
  ipcRenderer.send("cambiarPantalla", "./formulario.html");
});
