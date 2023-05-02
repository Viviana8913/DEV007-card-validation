import validator from "./validator.js";
let numbersConcatenated = "";
const button = document.getElementById("button");
button.addEventListener("click", function (event) {
  event.preventDefault();
  const month = document.getElementById("selectMes").value;
  const year = document.getElementById("selectYear").value;
  const cvv = document.getElementById("inputCCV").value;
  const name = document.getElementById("inputNombre").value;
  if (name.length + cvv.length + year.length + month.length > 7) {
    if (numbersConcatenated.length === 16) {
      if (validator.isValid(numbersConcatenated) === true) {
        alert("Tarjeta Valida");
      } else {
        alert("Tarjeta Invalida");
      }
    } else {
      alert("Ingrese el número de su tarjeta de crédito");
    }
  } else {
    alert("Ingrese los datos completos");
  }
});
const inputNumero = document.getElementById("inputNumero");
inputNumero.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    numbersConcatenated = numbersConcatenated.slice(0, -1);
  }
  if (numbersConcatenated.length <= 15) {
    const numbersValid = "0123456789";
    if (numbersValid.indexOf(event.key) !== -1) {
      numbersConcatenated = numbersConcatenated + event.key;
    }
  } else {
    alert("Solo se pueden ingresar 16 dígitos");
  }
  inputNumero.value = validator.maskify(numbersConcatenated);
});
const tarjeta = document.querySelector("#tarjeta");
const btnAbrirFormulario = document.querySelector("#btn-abrir-formulario");
const formulario = document.querySelector("#formulario-tarjeta");
const numeroTarjeta = document.querySelector("#tarjeta .numero");
const nombreTarjeta = document.querySelector("#tarjeta .nombre");
const logoMarca = document.querySelector("#logo-marca");
const firma = document.querySelector("#tarjeta .firma p");
const mesExpiracion = document.querySelector("#tarjeta .mes");
const yearExpiracion = document.querySelector("#tarjeta .year");
const ccv = document.querySelector("#tarjeta .ccv");
// Rotación de la tarjeta
tarjeta.addEventListener("click", () => {
  tarjeta.classList.toggle("active");
});
// Botón de abrir formulario
btnAbrirFormulario.addEventListener("click", () => {
  btnAbrirFormulario.classList.toggle("active");
  formulario.classList.toggle("active");
});
// Select del mes
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  formulario.selectMes.appendChild(option);
}
// Select del año
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  formulario.selectYear.appendChild(option);
}
// Input número de tarjeta
formulario.inputNumero.addEventListener("keyup", (e) => {
  const valorInput = e.target.value;
  formulario.inputNumero.value = valorInput
    // Eliminar espacios en blanco
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "")
    // Espacios cada 4 dígitos
    .replace(/([0-9]{4})/g, "$1 ")
    // Elimina el último espacio
    .trim();
  numeroTarjeta.textContent = valorInput;
  if (
    valorInput.startsWith("4") ||
    valorInput.startsWith("5") ||
    valorInput.startsWith("37") ||
    valorInput.startsWith("6")
  ) {
    if (valorInput.startsWith("4")) {
      logoMarca.innerHTML = "";
      const img = document.createElement("img");
      img.src = "img1/logos/visa.png";
      logoMarca.appendChild(img);
    } else if (valorInput.startsWith("5")) {
      logoMarca.innerHTML = "";
      const img = document.createElement("img");
      img.src = "img1/logos/mastercard.png";
      logoMarca.appendChild(img);
    } else if (valorInput.startsWith("37")) {
      logoMarca.innerHTML = "";
      const img = document.createElement("img");
      img.src = "img1/logos/amex.png";
      logoMarca.appendChild(img);
    } else if (valorInput.startsWith("6")) {
      logoMarca.innerHTML = "";
      const img = document.createElement("img");
      img.src = "img1/logos/discover.png";
      logoMarca.appendChild(img);
    }
    formulario.inputNumero.classList.remove("invalid");
    formulario.inputNumero.classList.add("valid");
  } else {
    formulario.inputNumero.classList.remove("valid");
    formulario.inputNumero.classList.add("invalid");
    logoMarca.innerHTML = "";
  }
});
// Input nombre de tarjeta
formulario.inputNombre.addEventListener("keyup", (e) => {
  const valorInput = e.target.value;
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;
  if (valorInput.trim() === "") {
    nombreTarjeta.textContent = "__________";
  }
  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, "");
});
// Select mes
formulario.selectMes.addEventListener("change", (e) => {
  mesExpiracion.textContent = e.target.value;
});
// Select Año
formulario.selectYear.addEventListener("change", (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
});
// CCV
formulario.inputCCV.addEventListener("keyup", () => {
  if (!tarjeta.classList.contains("active")) {
    tarjeta.classList.toggle("active");
  }
  formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "");
  ccv.textContent = formulario.inputCCV.value;
});






