// NAVBAR DINÁMICA CON SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navbar");

  // Ajustes finos
  const maxScroll = 280; // DATO: mientras más alto, más lenta la transición
  const colorStart = 0.6;
  const colorEnd = 0.9;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const opacity = Math.min(scroll / maxScroll, 1);

    // Fondo azur difuminado
    nav.style.background = `
            linear-gradient(
                to bottom,
                rgba(125, 170, 205, ${0.85 * opacity}),
                rgba(125, 170, 205, ${0.55 * opacity}),
                rgba(125, 170, 205, ${0.25 * opacity}),
                rgba(125, 170, 205, 0)
            )
        `;

    nav.style.backdropFilter = `blur(${10 * opacity}px)`;

    // TRANSICIÓN SUAVE DE COLOR
    let t;
    if (opacity <= colorStart) {
      t = 0;
    } else if (opacity >= colorEnd) {
      t = 1;
    } else {
      t = (opacity - colorStart) / (colorEnd - colorStart);
    }

    const r = Math.round(255 - (255 - 9) * t);
    const g = Math.round(255 - (255 - 26) * t);
    const b = Math.round(255 - (255 - 52) * t);
    const a = 0.85 + (1 - 0.85) * t;

    const color = `rgba(${r}, ${g}, ${b}, ${a})`;

    nav.style.setProperty("--link-color", color);
    nav.style.setProperty("--link-accent", color);
  });
});

// GALERÍA DE IMÁGENES CON ZOOM
const fotos = document.querySelectorAll(".foto");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const cerrar = document.getElementById("cerrar");

let zoomActivo = false;
const ZOOM = 1.8;

// Abrir imagen
fotos.forEach(foto => {
    foto.addEventListener("click", () => {
        const src = foto.dataset.img;
        if (!src) return;

        modal.style.display = "flex";
        modalImg.src = src;

        resetZoom();
    });
});

// Click para zoom IN / OUT desde el mismo punto
modalImg.addEventListener("click", e => {
    if ("ontouchstart" in window) return;

    const rect = modalImg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    modalImg.style.transformOrigin = `${x}% ${y}%`;

    zoomActivo = !zoomActivo;

    if (zoomActivo) {
        modalImg.style.transform = `scale(${ZOOM})`;
        modalImg.classList.add("zoom");
    } else {
        modalImg.style.transform = "scale(1)";
        modalImg.classList.remove("zoom");
    }
});

// Cerrar
cerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", e => {
    if (e.target === modal) cerrarModal();
});

// Helpers
function resetZoom() {
    zoomActivo = false;
    modalImg.style.transform = "scale(1)";
    modalImg.classList.remove("zoom");
    modalImg.style.transformOrigin = "center center";
}

function cerrarModal() {
    modal.style.display = "none";
    resetZoom();
}

