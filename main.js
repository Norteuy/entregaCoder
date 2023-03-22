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
let sueldoBase=0;
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
numObrero = document.getElementById("numeroObrero");
nomCortador = document.getElementById("nombreObrero");
toneladasCortadas = document.getElementById("toneladas");
canaTrabada = document.getElementById("trabada");
canaMalQuemada = document.getElementById("quemada");
sacadaMayor = document.getElementById("lineaMayor");
btnCalcular = document.getElementById("btnCalcular")
let divResultado = document.getElementById("resultado");

//captura numero y devuelve nombre de obrero 
numObrero.addEventListener("change", function (e) {
   for (const cortador of listaObreros) {
    if (cortador.idCortador == e.target.value) {
      nomCortador.style.color='red'
      nomCortador.innerHTML = cortador.nombreCortador;
    }
  } 
});



//ejecuta el calculo al presionar el boton
btnCalcular.addEventListener("click", calculoCorte)


//calculo salario
function calculoCorte() {
  let tc=Number(toneladasCortadas.value)  //tranformo en numero el valor
  if(canaTrabada.checked){   //chequeo agregado
    sueldoBase+=tc*canaTrabada$
  };
  if (canaMalQuemada.checked){    //chequeo agregado
    sueldoBase+=tc*canaMalQuemada$
  }
  if(sacadaMayor.checked){     //chequeo agregado
    sueldoBase+=tc*sacadaMayor$
  }

  sueldoBase += tc * corteSacada$ +  frutasVerduras$;

  let sueldo={
    id:numObrero.value,
    nombre:nomCortador.innerText,
    salario:sueldoBase
  }

listaSalarios.push(sueldo)
let arregloJson=JSON.stringify(listaSalarios)
localStorage.setItem("salarios",arregloJson)

mostrarSalarios();
  
}

//muestra tabla con los salarios calculados
function mostrarSalarios(){
  let tabla = document.getElementById("tbody");

  tabla.innerHTML = "";
  for( let sueldo of listaSalarios){

      let fila= document.createElement("tr");

      fila.innerHTML = `<td>${sueldo.id}</td>
                        <td><p>${sueldo.nombre}</p></td>
                        <td>${sueldo.sueldoBase}</td>
                        <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                        `
      tabla.append(fila);

}
}





 

