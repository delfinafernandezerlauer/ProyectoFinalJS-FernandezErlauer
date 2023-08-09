// cambiar a modo oscuro

const botonColorMode = document.querySelector("#switch-color");
const body = document.body;

let darkMode = localStorage.getItem("dark");

function activarDarkMode() {
    body.classList.add("dark");
    localStorage.setItem("dark", "activado");
}

function desactivarDarkMode() {
    body.classList.remove("dark");
    localStorage.setItem("dark", "desactivado");
}

if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark");

    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})



// MATERIAS ***************************
class Materia {
  constructor(nombre, nota) {
    this.nombre = nombre;
    this.sumaNotas = nota;
    this.contadorNotas = 1;
  }
}

const formMaterias = document.querySelector("#form-materias");
const formInputMaterias = document.querySelector("#form-input-materias");
const formInputNota = document.querySelector("#form-input-nota");

formMaterias.addEventListener("submit", ingresarMateria);

let materias=[];

const nuevaMateria = new Materia("matematica", 6);
materias.push(nuevaMateria);

localStorage.setItem("materias", JSON.stringify (materias))

function ingresarMateria(e) {
  e.preventDefault();

  materias = JSON.parse(localStorage.getItem("materias"));

  const materiaNombre = formInputMaterias.value;
  const nota = parseFloat(formInputNota.value);

  const materiaExistente = materias.find((mat) => mat.nombre === materiaNombre);

  if (materiaExistente) {
    // Si existe
    materiaExistente.sumaNotas += nota;
    materiaExistente.contadorNotas += 1;
  } else {
    // si no existe
    const nuevaMateria = new Materia(materiaNombre, nota);
    materias.push(nuevaMateria);
  }

  localStorage.setItem("materias", JSON.stringify(materias));
}

// BUSCADOR DE MATERIAS

function calcularPromedioMateria(materia) {
  const materiaEncontrada = materias.find((mat) => mat.nombre === materia);

  if (materiaEncontrada) {
    const promedio = materiaEncontrada.sumaNotas / materiaEncontrada.contadorNotas;
    return promedio.toFixed(2); 
  } else {
    return "Materia no encontrada";
  }
}

const formBuscadorMateria = document.querySelector("#form-buscador-materia");
const formInputBuscadorMateria = document.querySelector("#form-input-buscador-materia");
const resultadoBuscadorMateria = document.querySelector("#resultado-buscador-materia");

formBuscadorMateria.addEventListener("submit", buscarMateria);

function buscarMateria(e) {
  e.preventDefault();
  const materiaBuscada = formInputBuscadorMateria.value;

  const promedioMateria = calcularPromedioMateria(materiaBuscada);

  resultadoBuscadorMateria.innerText = `Promedio de ${materiaBuscada}: ${promedioMateria}`;
}


// FIN MATERIAS ***********************

// PRESUPUESTO *****************************

const listaPresupuesto = document.querySelector("#lista-presupuesto");

const formPresupuesto = document.querySelector("#form-presupuesto")

const formInputPresupuesto = document.querySelector("#form-input-presupuesto")

const formInputGasto = document.querySelector("#form-input-gasto")

formPresupuesto.addEventListener("submit", agregarPresupuesto)

function agregarPresupuesto(e){

    e.preventDefault()
    if(formInputPresupuesto!=""){
        
      let presupuesto = document.createElement("p"); 

        if(!isNaN(formInputPresupuesto.value)){
          presupuesto.innerText = formInputPresupuesto.value;

        localStorage.setItem("presupuestoEnStorage", formInputPresupuesto.value) 

        listaPresupuesto.append(presupuesto)
        }
        else{
        swal("Ingrese un gasto válido", "(números)", "error");
  
        }
        }
    else{
        alert("input vacio")
    }
}

// GASTOS: 

const listaGastos = document.querySelector("#lista-gastos");
const formGastos = document.querySelector("#form-gastos");
const formInputGastos = document.querySelector("#form-input-gastos");
const saldoElement = document.querySelector("#saldo");


let gastoTotal = Number(localStorage.getItem("gastoTotal")) || 0;
actualizarGastoTotal();

let presupuestoenStorage = parseFloat(localStorage.getItem("presupuestoEnStorage")) || 0;
actualizarSaldo();

formGastos.addEventListener("submit", agregarGasto);

function agregarGasto(e) {
  e.preventDefault();
  const nuevoGasto = parseFloat(formInputGastos.value);

  if (!isNaN(nuevoGasto)) {
    let gasto = document.createElement("li");
    gasto.innerText = formInputGastos.value;
    listaGastos.append(gasto);

    gastoTotal += nuevoGasto;
    localStorage.setItem("gastoTotal", gastoTotal);

    actualizarGastoTotal();
    actualizarSaldo();
    formInputGastos.value = "";
  } else {
    swal("Ingrese un gasto válido", "(números)", "error");
  }
}

function actualizarGastoTotal() {
  const gastoTotalElement = document.querySelector("#gasto-total");
  gastoTotalElement.innerText = "gasto total: " + gastoTotal;
}

function actualizarSaldo() {
  const saldo = presupuestoenStorage - gastoTotal;
  saldoElement.innerText = "saldo: " + saldo.toFixed(2);
}

function limpiarListas() {
  const gastosItems = listaGastos.querySelectorAll("li");
  const listaPresupuesto = document.querySelector("#lista-presupuesto");

  listaPresupuesto.innerHTML = "";
  
  gastosItems.forEach((item) => {
    listaGastos.removeChild(item);
  });
}

actualizarGastoTotal();

// borrar datos

const botonBorrarDatos = document.querySelector("#borrar-datos");
botonBorrarDatos.addEventListener("click", borrarDatos);

function borrarDatos() {
  gastoTotal = 0;
  presupuestoenStorage = 0;
  localStorage.setItem("gastoTotal", gastoTotal);
  localStorage.setItem("presupuestoEnStorage", presupuestoenStorage);

  actualizarGastoTotal();
  actualizarSaldo();
  limpiarListas();
}



formPresupuesto.addEventListener("submit", guardarPresupuesto);

function guardarPresupuesto(e) {
  e.preventDefault();
  const nuevoPresupuesto = parseFloat(formInputPresupuesto.value);
  if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) {
    presupuestoenStorage = nuevoPresupuesto;
    localStorage.setItem("presupuestoEnStorage", presupuestoenStorage);
    actualizarSaldo();
    formInputPresupuesto.value = "";
  } else {
    swal("Ingrese un presupuesto válido", "(números)", "error");
  }
}




//////// PELICULAS

const formPeliculas=document.querySelector("#form-peliculas");
const inputPeliculas=document.querySelector("#input-peliculas");
const resultadoRecomendacion = document.querySelector("#resultado-recomendacion");


formPeliculas.addEventListener("submit", recomendarPelicula);


function recomendarPelicula(e) {
  e.preventDefault();


  fetch("peliculas.json")
    .then(response => response.json())
    .then(data => {

      const peliculas = data;

      const peliculaAleatoria = peliculas[Math.floor(Math.random() * peliculas.length)];

      const recomendacion = `
        Nombre: ${peliculaAleatoria.name}
        Año: ${peliculaAleatoria.year}
        País: ${peliculaAleatoria.country}
        Calificación: ${peliculaAleatoria.rating}
        Director: ${peliculaAleatoria.director}

      ...disfrutala!`;

      resultadoRecomendacion.innerText = recomendacion;
    })
    .catch(error => {
      console.error("Error al cargar el archivo JSON:", error);
      resultadoRecomendacion.innerText = "Hubo un error al cargar las películas.";
    });
}