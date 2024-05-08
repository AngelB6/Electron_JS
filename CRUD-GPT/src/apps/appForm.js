const { ipcRenderer } = require("electron");

const formServicio = document.getElementById("setFormServicio");
const backMain = document.getElementById("backMain");

formServicio.addEventListener("click", () => {
  // Traemos los valores de cada input por medio del ID
  const fechaServ = document.getElementById("fechaServ").value;
  const nomClie = document.getElementById("nomClie").value;
  const numRef = parseInt(document.getElementById("numRef").value);
  const monedaCoti = document.getElementById("monedaCoti").value;
  const tipoServ = document.getElementById("tipoServ").value;
  const estatusClie = document.getElementById("estatusClie").value;
  const vol = parseFloat(document.getElementById("vol").value);
  const categoCliente = document.getElementById("categoCliente").value;

  // Insertamos toda la data en una constante
  const data = {fechaServ, nomClie, numRef, monedaCoti, tipoServ, estatusClie, vol, categoCliente};
  // Enviamos y comprobamos la data enviada al main process para su inserción en la BD
  ipcRenderer.send("dataSet", data);
  console.log(data);
});

backMain.addEventListener("click", () => {
  ipcRenderer.send("cambiarPantalla", "../view/index.html");
});
