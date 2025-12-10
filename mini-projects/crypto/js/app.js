const criptoMondeasSelect = document.querySelector("#criptomonedas");
const mondeasSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

//Create a promise
const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();
  formulario.addEventListener("submit", submitFormulario);
  criptoMondeasSelect.addEventListener("change", leerValor);
  mondeasSelect.addEventListener("change", leerValor);
});

function consultarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => obtenerCriptomonedas(resultado.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptoMondeasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
  console.log(objBusqueda);
}

function submitFormulario(e) {
  e.preventDefault();

  //Validation
  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === "" || criptomoneda === "") {
    mostrarAlerta("Both fields are required");
    return;
  }
  mostrarSpinner();

  //Consult API with results
  consultarAPI();
}

function mostrarAlerta(msg) {
  if (!document.querySelector(".error")) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");

    //Error message
    divMensaje.textContent = msg;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((cotizacion) => {
      mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
    });
}

function mostrarCotizacionHTML(cotizacion) {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  limpiarHTML();
  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `The price is: <span>${PRICE}</span>`;
  const precioAlto = document.createElement("p");
  precioAlto.innerHTML = `Highest price of the day: <span>${HIGHDAY}</span>`;
  const precioBajo = document.createElement("p");
  precioBajo.innerHTML = `Lowest price of the day: <span>${LOWDAY}</span>`;
  const ultimasHoras = document.createElement("p");
  ultimasHoras.innerHTML = `24-hour change: <span>${CHANGEPCT24HOUR}%</span>`;
  const ultimaActualizacion = document.createElement("p");
  ultimaActualizacion.innerHTML = `Last updated: <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHTML();
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;
  resultado.appendChild(spinner);
}
