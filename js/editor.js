const items = document.querySelectorAll(".item");
const canvas = document.getElementById("canvas");

let draggingType = null;

// === Arrastrar desde el panel ===
items.forEach(item => {
  item.addEventListener("dragstart", e => {
    draggingType = item.dataset.type;
    e.dataTransfer.effectAllowed = "copy";
  });
});

// === Soltar en el canvas ===
canvas.addEventListener("dragover", e => {
  e.preventDefault();
});

canvas.addEventListener("drop", e => {
  e.preventDefault();
  if (!draggingType) return;

  // Crear un bloque desde la plantilla
  const templateHTML = templates[draggingType];
  const wrapper = document.createElement("div");
  wrapper.classList.add("bloque-wrapper");
  wrapper.setAttribute("draggable", "true");
  wrapper.innerHTML = templateHTML;

  // Quitar texto inicial si es el primer drop
  const placeholder = canvas.querySelector(".placeholder");
  if (placeholder) placeholder.remove();

  canvas.appendChild(wrapper);

  draggingType = null;
  activarReordenamiento();
});

// === Función para permitir reordenar los bloques dentro del canvas ===
function activarReordenamiento() {
  const bloques = canvas.querySelectorAll(".bloque-wrapper");

  bloques.forEach(bloque => {
    bloque.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", "");
      bloque.classList.add("dragging");
    });

    bloque.addEventListener("dragend", e => {
      bloque.classList.remove("dragging");
    });
  });

  canvas.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(canvas, e.clientY);
    if (afterElement == null) {
      canvas.appendChild(dragging);
    } else {
      canvas.insertBefore(dragging, afterElement);
    }
  });
}

// === Calcular posición para insertar bloque mientras arrastras ===
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".bloque-wrapper:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}