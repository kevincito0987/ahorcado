console.log("Este es el código de la página principal, que se ejecutará cuando se cargue la página.");

const palabras = ["javascript", "frontend", "developer", "programacion", "juego", "ahorcado", "html", "css"];
let palabraOculta = "";
let errores = 0;
const maxErrores = 11;


const canvas = document.getElementById("ahorcado-canvas");
const ctx = canvas.getContext("2d");
const contenedorPalabra = document.getElementById("word-container");
const tecladoContainer = document.getElementById("teclado-container");
const botonReiniciar = document.getElementById("reiniciar-btn");

function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    contenedorPalabra.innerHTML = "";
    tecladoContainer.innerHTML = "";
    errores = 0;

    palabraOculta = palabras[Math.floor(Math.random() * palabras.length)];
    console.log("Palabra seleccionada:", palabraOculta);

    for (let i = 0; i < palabraOculta.length; i++) {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("data-index", i);
        contenedorPalabra.appendChild(span);
    }

    
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letras.split("").forEach(letra => {
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.addEventListener("click", () => verificarLetra(letra.toLowerCase(), boton));
        tecladoContainer.appendChild(boton);
    });
}