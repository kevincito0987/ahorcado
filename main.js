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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    contenedorPalabra.replaceChildren(); 
    tecladoContainer.replaceChildren(); 
    errores = 0;

    palabraOculta = palabras[Math.floor(Math.random() * palabras.length)];
    console.log("Palabra seleccionada:", palabraOculta);

    // Crear spans dinámicos para la palabra oculta
    for (let i = 0; i < palabraOculta.length; i++) {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("data-index", i);
        contenedorPalabra.appendChild(span);
    }

    // Generar el teclado virtual dinámicamente
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letras.split("").forEach(letra => {
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.addEventListener("click", () => procesarLetra(letra.toLowerCase(), boton));
        tecladoContainer.appendChild(boton);
    });
}

function procesarLetra(letra, boton) {
    boton.disabled = true; // Desactiva el botón
    let acierto = false;

    palabraOculta.split("").forEach((caracter, index) => {
        if (caracter === letra) {
            acierto = true;
            const span = contenedorPalabra.querySelector(`[data-index="${index}"]`);
            span.textContent = letra; // Actualiza la letra correcta
        }
    });

    if (!acierto) {
        errores++;
        dibujarAhorcado(errores);

        if (errores === maxErrores) {
            alert("¡Ahorcado perdido! La palabra era: " + palabraOculta);
            reiniciarJuego();
        }
    } else if (Array.from(contenedorPalabra.children).every(span => span.textContent !== "_")) {
        alert("¡Ganaste! La palabra era: " + palabraOculta);
        reiniciarJuego();
    }
}

function dibujarAhorcado(errores) {
    const partes = [
        () => ctx.fillRect(50, 250, 200, 10), // Base
        () => ctx.fillRect(120, 50, 10, 200), // Poste
        () => ctx.fillRect(120, 50, 100, 10), // Brazo horizontal
        () => ctx.fillRect(220, 50, 2, 50),   // Cuerda
        () => { // Cabeza
            ctx.beginPath();
            ctx.arc(220, 110, 20, 0, Math.PI * 2);
            ctx.stroke();
        },
        () => ctx.fillRect(220, 130, 2, 50),  // Cuerpo
        () => { // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(220, 140);
            ctx.lineTo(200, 170);
            ctx.stroke();
        },
        () => { // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(220, 140);
            ctx.lineTo(240, 170);
            ctx.stroke();
        },
        () => { // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(220, 180);
            ctx.lineTo(200, 210);
            ctx.stroke();
        },
        () => { // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(220, 180);
            ctx.lineTo(240, 210);
            ctx.stroke();
        },
        () => { // Detalles de la cara (ojos y boca)
            // Ojo izquierdo
            ctx.beginPath();
            ctx.arc(215, 105, 2, 0, Math.PI * 2);
            ctx.fill();
            // Ojo derecho
            ctx.beginPath();
            ctx.arc(225, 105, 2, 0, Math.PI * 2);
            ctx.fill();
            // Boca (línea triste)
            ctx.beginPath();
            ctx.moveTo(215, 115);
            ctx.lineTo(225, 115);
            ctx.stroke();
        }
    ];

    if (errores > 0 && errores <= maxErrores) {
        partes[errores - 1](); // Dibuja la parte correspondiente del muñeco
    }
}

function reiniciarJuego() {
    iniciarJuego();
}

// Listener para el botón "Reiniciar"
botonReiniciar.addEventListener("click", reiniciarJuego);

// Inicializar el juego al cargar
iniciarJuego();
