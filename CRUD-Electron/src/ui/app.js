const productForm = document.getElementById("productForm");

const { ipcRenderer } = require("electron");
const main = ipcRenderer.require("./main.js");

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  };
  main.createProduct(newProduct);
});
