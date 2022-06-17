const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //Validar el formulario
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    //hubo error
    mostrarError("Ambos campos son obligatorios");

    return;
  }
  //consultar API
  consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
  const appId = "5c7e0730f307e833def320c2306dbf87";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML(); //limpia el html previo
      if (datos.cod === "404") {
        mostrarError("ciuidad no encontrada");
        return;
      }

      //imprime la respuesta en el html
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const temperatura = kelvinCentigrados(temp);
  const tempMax = kelvinCentigrados(temp_max);
  const tempMin = kelvinCentigrados(temp_min);

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const max = document.createElement("p");
  max.innerHTML = `Max: ${tempMax} &#8451;`;
  max.classList.add("text-xl");

  const min = document.createElement("p");
  min.innerHTML = `Min: ${tempMin} &#8451;`;
  min.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(max);
  resultadoDiv.appendChild(min);

  resultado.appendChild(resultadoDiv);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    //Crear una alerta
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

const kelvinCentigrados = (grados) => parseInt(grados - 273.15);

function spinner() {
  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

  resultado.appendChild(divSpinner);
}
