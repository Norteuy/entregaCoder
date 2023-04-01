/*
Calculo de sueldo de obreros de la caña de azucar  
*/

//definicion de la clase cortadores
class Cortadores {
  constructor(idCortador, nombreCortador) {
    this.idCortador = idCortador;
    this.nombreCortador = nombreCortador;
  }
}

//declaración de variables
let numObrero;
let nomCortador;
let toneladasCortadas = 0;
let otraRemuneracion = 0;
let sueldoBase = 0;
let cantidadObreros;
let canaTrabada;
let canaMalQuemada;
let sacadaMayor;

//declaración de valores constantes
const corteSacada$ = 500.01;
const corteApilada$ = 369.48;
const corte$ = 191.31;
const sacadaMayor$ = 172.79;
const despunte$ = 128.78;
const canaTrabada$ = 86.78;
const canaMalQuemada$ = 24.24;
const frutasVerduras$ = 1414.26;

const listaObreros = [];
const listaSalarios = [];

//declaracion  objetos obreros
listaObreros.push(new Cortadores(1, "Jose"));
listaObreros.push(new Cortadores(2, "Marcos"));
listaObreros.push(new Cortadores(3, "Luis"));

//captura elementos del DOM
const form = document.getElementById("formulario");
numObrero = document.getElementById("numeroObrero");
nomCortador = document.getElementById("nombreObrero");
toneladasCortadas = document.getElementById("toneladas");
canaTrabada = document.getElementById("trabada");
canaMalQuemada = document.getElementById("quemada");
sacadaMayor = document.getElementById("lineaMayor");
btnCalcular = document.getElementById("btnCalcular");
let divResultado = document.getElementById("resultado");

//captura numero y devuelve nombre de obrero
numObrero.addEventListener("change", function (e) {
  for (const cortador of listaObreros) {
    if (cortador.idCortador == e.target.value) {
      nomCortador.style.color = "red";
      nomCortador.innerHTML = cortador.nombreCortador;
    }
  }
});

//ejecuta el calculo al presionar el boton
form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculoCorte();
});

//calculo salario
function calculoCorte() {
  sueldoBase = 0;
  let tc = Number(toneladasCortadas.value); //tranforma en numero el valor
  if (canaTrabada.checked) {
    //chequeo agregado
    sueldoBase += tc * canaTrabada$;
  }
  if (canaMalQuemada.checked) {
    //chequeo agregado
    sueldoBase += tc * canaMalQuemada$;
  }
  if (sacadaMayor.checked) {
    //chequeo agregado
    sueldoBase += tc * sacadaMayor$;
  }

  sueldoBase += tc * corteSacada$ + frutasVerduras$;

  let sueldo = {
    id: numObrero.value,
    nombre: nomCortador.innerText,
    salario: sueldoBase,
  };

  listaSalarios.push(sueldo);
  let arregloJson = JSON.stringify(listaSalarios);
  localStorage.setItem("salarios", arregloJson);

  mostrarSalarios();
}

//muestra tabla con los salarios calculados
function mostrarSalarios() {
  let tabla = document.getElementById("tbody");

  tabla.innerHTML = "";
  for (let sueldo of listaSalarios) {
    let fila = document.createElement("tr");

    fila.innerHTML = `<td>${sueldo.id}</td>
                        <td><p>${sueldo.nombre}</p></td>
                        <td>${sueldo.salario}</td>
                        <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                        `;
    tabla.append(fila);
  }

}

//**********API  clima**********
let cajaClima = document.getElementById("clima");
let tempValor = document.getElementById("temp_valor");
console.log(tempValor);
let tempDesc = document.getElementById("temp_desc");
let ubicacion = document.getElementById("ubicacion");
let icono = document.getElementById("icono");

function mostrar_posicion(posicion) {
  let lat = posicion.coords.latitude;
  let long = posicion.coords.longitude;
  let key = "bbf8893c6e8030e157bb633d11a66e17";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      let temp = Math.round(data.main.temp);

      clima.innerHTML = `<p id="ubicacion">${data.name}</p>
                           <p id="temp">${temp} °C</p>
                           <p id="descripcion">${data.weather[0].description}</p>
                           <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" id="icono">`;
    });
}

// geolocalizar para el clima
navigator.geolocation.getCurrentPosition(mostrar_posicion);
