document.addEventListener("DOMContentLoaded", function () {
    // 1. Elementos del menú de navegación
    const botonInicio = document.getElementById("enlace-inicio");
    const botonComunidad = document.getElementById("enlace-comunidad");
    const botonJuegos = document.getElementById("enlace-juegos");
    
    // 2. Secciones de contenido de la página
    const seccionBienvenida = document.getElementById("bienvenida");
    const seccionComunidad = document.getElementById("comunidad");
    const seccionJuegos = document.getElementById("juegos");

    // Función auxiliar para ocultar todas las pantallas antes de activar una
    function ocultarTodo() {
        if(seccionBienvenida) seccionBienvenida.style.display = "none";
        if(seccionComunidad) seccionComunidad.style.display = "none";
        if(seccionJuegos) seccionJuegos.style.display = "none";
    }

    // Navegación: Clic en Inicio
    if (botonInicio) {
        botonInicio.addEventListener("click", function (evento) {
            evento.preventDefault();
            ocultarTodo();
            seccionBienvenida.style.display = "block";
        });
    }

    // Navegación: Clic en Nuestra Comunidad
    if (botonComunidad) {
        botonComunidad.addEventListener("click", function (evento) {
            evento.preventDefault();
            ocultarTodo();
            seccionComunidad.style.display = "block";
        });
    }

    // Navegación: Clic en Juegos
    if (botonJuegos) {
        botonJuegos.addEventListener("click", function (evento) {
            evento.preventDefault();
            ocultarTodo();
            seccionJuegos.style.display = "block";
        });
    }
});

// ========================================================
// LÓGICA DE CONTROL PARA LOS 3 JUEGOS INTERACTIVOS
// ========================================================

// Juego 1: Video Cuento (Opción Múltiple)
function verificarJuego1() {
    const opciones = document.getElementsByName("juego1");
    let seleccion = "";
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) seleccion = opciones[i].value;
    }
    
    const resultado = document.getElementById("resultado1");
    if (seleccion === "correcto") {
        resultado.innerHTML = "¡Correcto! 🎉 Los sabios y ancianos guían este ritual sagrado.";
        resultado.style.color = "#28a745";
    } else if (seleccion === "incorrecto") {
        resultado.innerHTML = "Inténtalo de nuevo ❌ Recuerda revisar los rostros sabios del video.";
        resultado.style.color = "#dc3545";
    } else {
        resultado.innerHTML = "Por favor, selecciona una opción antes de verificar.";
        resultado.style.color = "#ffc107";
    }
}

// VARIABLES Y LÓGICA PARA EL JUEGO 2: SOPA DE LETRAS
let letrasEncontradas = { CHONTA: 0, SHUAR: 0, ZURMI: 0 };
const totalesSopa = { CHONTA: 6, SHUAR: 5, ZURMI: 5 }; 

function presionarLetra(boton, tipoPalabra) {
    if (tipoPalabra !== 'X' && letrasEncontradas[tipoPalabra] < totalesSopa[tipoPalabra]) {
        
        // Evitamos que sume dos veces la misma celda si ya fue pulsada
        if (boton.style.backgroundColor !== "rgb(155, 89, 182)" && boton.style.backgroundColor !== "rgb(40, 167, 69)") {
            boton.style.backgroundColor = "#9b59b6"; 
            boton.style.color = "white";
            letrasEncontradas[tipoPalabra]++;
            
            if (letrasEncontradas[tipoPalabra] === totalesSopa[tipoPalabra]) {
                const indicadorPalabra = document.getElementById("palabra-" + tipoPalabra.toLowerCase());
                if (indicadorPalabra) {
                    indicadorPalabra.style.color = "#28a745"; 
                    indicadorPalabra.style.textDecoration = "line-through"; 
                }
                
                marcarPalabraLograda(tipoPalabra);
                verificarProgresoSopa();
            }
        }
    } else if (tipoPalabra === 'X') {
        // Parpadeo rojo fugaz por error
        boton.style.backgroundColor = "#dc3545";
        boton.style.color = "white";
        setTimeout(() => {
            boton.style.backgroundColor = "#fff";
            boton.style.color = "black";
        }, 300);
    }
}

function marcarPalabraLograda(palabra) {
    const botones = document.getElementsByClassName("letra-sopa");
    for (let i = 0; i < botones.length; i++) {
        if (botones[i].getAttribute("onclick").includes(`'${palabra}'`)) {
            botones[i].style.backgroundColor = "#28a745"; 
            botones[i].style.borderColor = "#28a745";
            botones[i].style.color = "white";
        }
    }
}

function verificarProgresoSopa() {
    const textoResultado = document.getElementById("resultado2");
    if (letrasEncontradas.CHONTA === 6 && letrasEncontradas.SHUAR === 5 && letrasEncontradas.ZURMI === 5) {
        textoResultado.innerHTML = "¡Espectacular! 🎉 Encontraste todas las palabras ancestrales de la sopa.";
        textoResultado.style.color = "#28a745";
    } else {
        textoResultado.innerHTML = "¡Bien hecho! Sigue buscando las palabras ocultas.";
    }
}

// Juego 3: Audio Cuento (Completar Palabra)
function verificarJuego3() {
    const respuesta = document.getElementById("juego3-respuesta").value.trim().toLowerCase();
    const resultado = document.getElementById("resultado3");
    
    if (respuesta === "tierra" || respuesta === "naturaleza") {
        resultado.innerHTML = "¡Espectacular! 🌍 La Pachamama es nuestra Madre Tierra. ¡Has completado todos los desafíos!";
        resultado.style.color = "#28a745";
    } else if (respuesta === "") {
        resultado.innerHTML = "Escribe una palabra antes de verificar.";
        resultado.style.color = "#ffc107";
    } else {
        resultado.innerHTML = "Cerca, pero no es esa palabra ❌ Piensa en el planeta sobre el que caminamos.";
        resultado.style.color = "#dc3545";
    }
}