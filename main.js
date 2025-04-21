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