

function mostrarSeccion(id) {

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll(".pagina");

    secciones.forEach(function(seccion) {
        seccion.style.display = "none";
    });

    // Mostrar solamente la seleccionada
    document.getElementById(id).style.display = "block";

    // Subir al inicio
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Mostrar el producto al cargar la página
mostrarSeccion("c");

const diapositivasModelo = Array.from(document.querySelectorAll(".modelo-slide")).reverse();
const puntosModelo = Array.from(document.querySelectorAll(".modelo-punto"));
let indiceModelo = 0;
let temporizadorModelo;

function mostrarDiapositiva(indice) {
    indiceModelo = (indice + diapositivasModelo.length) % diapositivasModelo.length;

    diapositivasModelo.forEach(function(diapositiva, posicion) {
        const activa = posicion === indiceModelo;
        diapositiva.classList.toggle("activa", activa);
        diapositiva.setAttribute("aria-hidden", String(!activa));
        diapositiva.toggleAttribute("inert", !activa);
    });

    puntosModelo.forEach(function(punto, posicion) {
        const activo = posicion === indiceModelo;
        punto.classList.toggle("activa", activo);
        punto.setAttribute("aria-current", String(activo));
    });
}

function iniciarCarrusel() {
    window.clearInterval(temporizadorModelo);
    temporizadorModelo = window.setInterval(function() {
        mostrarDiapositiva(indiceModelo + 1);
    }, 60000);
}

if (diapositivasModelo.length > 1) {
    mostrarDiapositiva(indiceModelo);

    document.querySelectorAll("[data-carrusel]").forEach(function(boton) {
        boton.addEventListener("click", function() {
            const desplazamiento = boton.dataset.carrusel === "siguiente" ? 1 : -1;
            mostrarDiapositiva(indiceModelo + desplazamiento);
            iniciarCarrusel();
        });
    });

    puntosModelo.forEach(function(punto) {
        punto.addEventListener("click", function() {
            mostrarDiapositiva(Number(punto.dataset.indice));
            iniciarCarrusel();
        });
    });

    iniciarCarrusel();
}

document.querySelectorAll(".producto-miniatura").forEach(function(boton) {
    boton.addEventListener("click", function() {
        const ficha = boton.closest(".producto-slide--ficha");
        const imagenPrincipal = ficha.querySelector(".producto-ficha-imagen-principal");

        imagenPrincipal.src = boton.dataset.imagenFicha;
        imagenPrincipal.alt = boton.dataset.altFicha;

        ficha.querySelectorAll(".producto-miniatura").forEach(function(miniatura) {
            const activa = miniatura === boton;
            miniatura.classList.toggle("activa", activa);
            miniatura.setAttribute("aria-pressed", String(activa));
        });
    });
});