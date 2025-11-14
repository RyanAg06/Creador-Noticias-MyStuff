
/* === Mostrar/Ocultar HTML Generado === */
const btn_previsualizar_html = document.querySelector("#previsualizar_html")
const panel_html_generado = document.querySelector("#panel_html_generado")
btn_previsualizar_html.addEventListener("click", () =>
{
    panel_html_generado.classList.toggle("show")
    btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") ? "🚫Ocultar HTML" : "👁️Previsualizar HTML"
})








/* === Botones Zona Edicion === */
const btn_centrar_titulos = document.querySelector("#centrar_titulos")
btn_centrar_titulos.addEventListener("click", () =>
{
    btn_centrar_titulos.classList.toggle("centrados")
    btn_centrar_titulos.textContent = (btn_centrar_titulos.classList.contains("centrados") ? "⬅️Lado Izquierdo" : "↔️Centrar Titulos")
})
const btn_modo_vertical = document.querySelector("#modo_vertical")
btn_modo_vertical.addEventListener("click", () =>
{
    btn_modo_vertical.classList.toggle("vertical")
    btn_modo_vertical.textContent = (btn_modo_vertical.classList.contains("vertical") ? "📔Modo Cuadricula" : "↕️Modo Vertical")
})








/* === Crear Tarjeta === */
const canva = document.querySelector("#canva")
const btn_crear_tarjeta = document.querySelector("#crear_tarjeta")
btn_crear_tarjeta.addEventListener("click", e =>
{
    e.stopPropagation()

    // Eliminar Placeholder si Existe
    if (canva.querySelector(".placeholder_canva")) canva.querySelector(".placeholder_canva").remove()

    // Desactivar Tarjetas Anteriores
    desactivar_tarjetas_anteriores()

    // Crear Tarjeta
    const tarjeta_nueva = document.createElement("section")
    tarjeta_nueva.classList.add("tarjeta")

    // Agregar Placeholder a Tarjeta Nueva y Activarla !!! CORREGIR ENTRAR MOUSE
    const placeholder_tarjeta = document.createElement("p")
    placeholder_tarjeta.classList.add("placeholder_tarjeta")
    tarjeta_nueva.appendChild(placeholder_tarjeta)
    activar_tarjeta(tarjeta_nueva)

    // Agrego Listeners
    tarjeta_nueva.addEventListener("click", e =>
    {
        e.stopPropagation();
        desactivar_tarjetas_anteriores()
        activar_tarjeta(tarjeta_nueva)
    })
    tarjeta_nueva.addEventListener("dragstart", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.classList.add(".tarjeta_dragging")
    })
    tarjeta_nueva.addEventListener("dragleave", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.classList.remove("tarjeta_hover")
    })
    tarjeta_nueva.addEventListener("dragend", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.classList.remove(".tarjeta_dragging")
    })
    tarjeta_nueva.addEventListener("dragover", e =>
    {
        e.stopPropagation()
        e.preventDefault()
        if (tarjeta_nueva.classList.contains("activa") && tipo_elemento) tarjeta_nueva.classList.add("tarjeta_hover")
    })
    tarjeta_nueva.addEventListener("drop", e =>
    {
        e.stopPropagation()

        // Eliminar Clase
        tarjeta_nueva.classList.remove("tarjeta_hover")

        // Solo Permitir Agregar Elementos si Esta Activa Y Es un Elemento
        if (tarjeta_nueva.classList.contains("activa") && tipo_elemento)
        {
            switch (tipo_elemento)
            {
                case "imagen":
                {
                    console.log("Imagen agregado")
                    break
                }
                case "titulo":
                {
                    console.log("Titulo agregado")
                    break
                }
                case "minititulo":
                {
                    console.log("Minititulo agregado")
                    break
                }
                case "subtitulo":
                {
                    console.log("Subtitulo agregado")
                    break
                }
                case "parrafo":
                {
                    console.log("Parrafo agregado")
                    break
                }
                case "slider":
                {
                    console.log("Slider agregado")
                    break
                }
                case "lista":
                {
                    console.log("Lista agregado")
                    break
                }
                case "boton_visitar":
                {
                    console.log("Boton Visitar agregado")
                    break
                }
                case "boton_descargar":
                {
                    console.log("Boton Descargar agregado")
                    break
                }
                default:
                {
                    console.log("Elemento Desconocido")
                }
            }
        }
    })

    // Agregar Dentro de Canva
    canva.appendChild(tarjeta_nueva)
})
function activar_tarjeta(tarjeta)
{
    tarjeta.classList.add("activa")
    tarjeta.setAttribute("draggable", "true")
    if (tarjeta.querySelector(".placeholder_tarjeta")) tarjeta.querySelector(".placeholder_tarjeta").textContent = "📌Suelta Elementos Aqui Dentro"
}
function desactivar_tarjetas_anteriores()
{
    canva.querySelectorAll(".tarjeta").forEach(tarjeta =>
    {
        tarjeta.classList.remove("activa")
        if (tarjeta.querySelector(".placeholder_tarjeta")) tarjeta.querySelector(".placeholder_tarjeta").textContent = "🔒Tarjeta Inactiva"
        tarjeta.setAttribute("draggable", "false")
    });
}











/* === Drag and Drop: Agregar Elementos Dentro de Tarjetas == */
const elementos = document.querySelectorAll(".item")
let tipo_elemento = null
elementos.forEach(item =>
{
    // Obtener "data_type" del Elemento Tomado
    item.addEventListener("dragstart", e =>
    {
        e.stopPropagation()
        tipo_elemento = item.dataset.type
    })
    item.addEventListener("dragend", e =>
    {
        e.stopPropagation()
        tipo_elemento = null
    })
})












/* === Drag and Drop: Reordenamiento Tarjetas === */
function reordenamiento_tarjetas(container, y)
{
    const draggableElements = [...container.querySelectorAll(".bloque:not(.tarjeta_dragging)")]
    return draggableElements.reduce((closest, child) =>
    {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
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
