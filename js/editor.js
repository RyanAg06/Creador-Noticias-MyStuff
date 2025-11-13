
/* === Mostrar/Ocultar HTML Generado === */
const btn_previsualizar_html = document.querySelector("#previsualizar_html")
const panel_html_generado = document.querySelector("#panel_html_generado")
btn_previsualizar_html.addEventListener("click", () =>
{
    panel_html_generado.classList.toggle("show")
    btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") ? "Ocultar HTML" : "Previsualizar HTML"
})

/* === Crear Tarjeta === */
const canva = document.querySelector("#canva")
const btn_crear_tarjeta = document.querySelector("#crear_tarjeta")
btn_crear_tarjeta.addEventListener("click", e =>
{
    // Eliminar Placeholder si Existe
    if (canva.querySelector(".placeholder_canva")) canva.querySelector(".placeholder_canva").remove()

    // Desactivar Tarjetas Anteriores
    desactivar_tarjetas_anteriores()

    // Crear Tarjeta
    const tarjeta_nueva = document.createElement("section")
    tarjeta_nueva.classList.add("tarjeta")

    // Agregar Placeholder a Tarjeta Nueva y Activarla
    const placeholder_tarjeta = document.createElement("p")
    placeholder_tarjeta.classList.add("placeholder_tarjeta")
    tarjeta_nueva.appendChild(placeholder_tarjeta)
    activar_tarjeta(tarjeta_nueva)

    // Agrego Listener
    tarjeta_nueva.addEventListener("click", e =>
    {
        // Desactivar Tarjetas Anteriores
        e.stopPropagation();
        desactivar_tarjetas_anteriores()

        // Activar Tarjeta
        activar_tarjeta(tarjeta_nueva)
    })

    // Agregar Dentro de Canva
    canva.appendChild(tarjeta_nueva)
})

function activar_tarjeta(tarjeta)
{
    tarjeta.classList.add("activa")
    tarjeta.setAttribute("draggable", "true")
    tarjeta.querySelector(".placeholder_tarjeta").textContent = "📌Suelta Elementos Aqui Dentro"
}
function desactivar_tarjetas_anteriores()
{
    canva.querySelectorAll(".tarjeta").forEach(tarjeta =>
    {
        tarjeta.classList.remove("activa")
        tarjeta.querySelector(".placeholder_tarjeta").textContent = "🔒Tarjeta Inactiva"
        tarjeta.setAttribute("draggable", "false")
    });
}

/* === Sistema de Drag and Drop === */

// Drag and Drop: Reordenar Tarjeta


function calcular_reordenamiento(container, y)
{
    // Obtenemos todos los elementos hijos del contenedor que tienen la clase "bloque"
    // y que NO están siendo arrastrados actualmente (no tienen la clase "block_dragging").
    const draggableElements = [...container.querySelectorAll(".bloque:not(.block_dragging)")]

    // Usamos reduce para encontrar el elemento más cercano a la posición 'y' del mouse,
    // pero sólo entre los elementos que están *antes* de la posición 'y' (offset < 0).
    // Para cada elemento, calculamos el 'offset', que es la distancia vertical entre
    // el centro del elemento y la posición 'y' (positivo debajo, negativo arriba).
    // Guardamos el mayor valor de offset negativo (el más cercano por arriba a 'y').
    return draggableElements.reduce((closest, child) =>
    {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        // Si el offset es negativo (el mouse está por encima del centro del elemento)
        // y es el que más se acerca a 0, actualizamos el "closest".
        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child }
        else return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

















// const items = document.querySelectorAll(".item");
// const canvas = document.getElementById("canvas");

// let draggingType = null;

// // === Arrastrar desde el panel ===
// items.forEach(item => {
//   item.addEventListener("dragstart", e => {
//     draggingType = item.dataset.type;
//     e.dataTransfer.effectAllowed = "copy";
//   });
// });

// // === Soltar en el canvas ===
// canvas.addEventListener("dragover", e => {
//   e.preventDefault();
// });

// canvas.addEventListener("drop", e => {
//   e.preventDefault();
//   if (!draggingType) return;

//   // Crear un bloque desde la plantilla
//   const templateHTML = templates[draggingType];
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("bloque-wrapper");
//   wrapper.setAttribute("draggable", "true");
//   wrapper.innerHTML = templateHTML;

//   // Quitar texto inicial si es el primer drop
//   const placeholder = canvas.querySelector(".placeholder");
//   if (placeholder) placeholder.remove();

//   canvas.appendChild(wrapper);

//   draggingType = null;
//   activarReordenamiento();
// });

// // === Función para permitir reordenar los bloques dentro del canvas ===
// function activarReordenamiento() {
//   const bloques = canvas.querySelectorAll(".bloque-wrapper");

//   bloques.forEach(bloque => {
//     bloque.addEventListener("dragstart", e => {
//       e.dataTransfer.setData("text/plain", "");
//       bloque.classList.add("dragging");
//     });

//     bloque.addEventListener("dragend", e => {
//       bloque.classList.remove("dragging");
//     });
//   });

//   canvas.addEventListener("dragover", e => {
//     e.preventDefault();
//     const dragging = document.querySelector(".dragging");
//     const afterElement = getDragAfterElement(canvas, e.clientY);
//     if (afterElement == null) {
//       canvas.appendChild(dragging);
//     } else {
//       canvas.insertBefore(dragging, afterElement);
//     }
//   });
// }

// // === Calcular posición para insertar bloque mientras arrastras ===
// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll(".bloque-wrapper:not(.dragging)")];

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child };
//     } else {
//       return closest;
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element;
// }