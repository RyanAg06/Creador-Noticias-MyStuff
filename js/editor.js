
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
let tarjeta_activa = null

// Crear Tarjeta Arrastrando un Elemento al Canva
const canva = document.querySelector("#canva")
canva.addEventListener("dragover", e =>
{
    e.stopPropagation()
    e.preventDefault()
})
canva.addEventListener("drop", e =>
{
    e.stopPropagation()

    // Crear Tarjeta Si Suelta Elemento Encima y Esta el Placeholder
    if (tipo_elemento && canva.querySelector(".placeholder_canva"))
    {
        crear_tarjeta()
        agregar_elementos()
    }
})

// Crear Tarjeta Con Boton
const btn_crear_tarjeta = document.querySelector("#crear_tarjeta")
btn_crear_tarjeta.addEventListener("click", e =>
{
    e.stopPropagation()
    crear_tarjeta()
})
function crear_tarjeta ()
{
    // Eliminar Placeholder si Existe
    const placeholder_canva = canva.querySelector(".placeholder_canva")
    if (placeholder_canva) placeholder_canva.remove()

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

    // Agrego Listeners
    tarjeta_nueva.addEventListener("click", e =>
    {
        e.stopPropagation()
        desactivar_tarjetas_anteriores()

        // Activar/Desactivar Tarjeta
        if (tarjeta_activa == tarjeta_nueva)
        {
            desactivar_tarjetas_anteriores()
            tarjeta_activa = null
        }
        else
        {
            activar_tarjeta(tarjeta_nueva)
        }
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
            agregar_elementos()
        }
    })
    
    // Agregar Dentro de Canva
    canva.appendChild(tarjeta_nueva)
}
function desactivar_tarjetas_anteriores ()
{
    canva.querySelectorAll(".tarjeta").forEach(tarjeta =>
    {
        tarjeta.classList.remove("activa")
        if (tarjeta.querySelector(".placeholder_tarjeta")) tarjeta.querySelector(".placeholder_tarjeta").textContent = "🔒Tarjeta Inactiva"
        tarjeta.setAttribute("draggable", "false")
    })
}
function activar_tarjeta (tarjeta)
{
    tarjeta_activa = tarjeta
    tarjeta_activa.classList.add("activa")
    tarjeta_activa.setAttribute("draggable", "true")
    if (tarjeta_activa.querySelector(".placeholder_tarjeta")) tarjeta_activa.querySelector(".placeholder_tarjeta").textContent = "✅Tarjeta Activa"
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
function agregar_elementos ()
{
    // Agregar Elemento
    switch (tipo_elemento)
    {
        case "imagen":
        {
            // Crear Contenedor Imagenes si no Existe (Solo 1 Por Tarjeta)
            let contenedor_imagen = document.querySelector(".tarjeta__imagenes")
            if (!contenedor_imagen)
            {
                contenedor_imagen = document.createElement("div")
                contenedor_imagen.classList.add("tarjeta__imagenes")
            }
            else
            {
                alert("🚫Solo Puedes Agregar Una Imagen Por Tarjeta, Usa un Slider")
                return
            }

            // Pedir Ruta de Imagen
            const ruta = prompt("🔗Ingresa la Ruta de la Imagen")
            if (ruta == null || ruta == "") return

            // Crear Imagen
            const imagen = document.createElement("img")
            imagen.classList.add("tarjeta__imagen")
            imagen.src = ruta
            contenedor_imagen.appendChild(imagen)

            // Crear Imagen Fondo
            const imagen_fondo = document.createElement("img")
            imagen_fondo.classList.add("tarjeta__imagen-fondo")
            imagen_fondo.src = ruta
            contenedor_imagen.appendChild(imagen_fondo)

            // Pedir Texto Etiqueta
            const texto_etiqueta = prompt("📄Ingresa Texto de Etiqueta (Vacio para Omitir)")

            // Agregar Etiqueta si NO esta Vacia
            if (!(texto_etiqueta == null || texto_etiqueta == ""))
            {
                // Crear Contenedor Etiqueta
                const contenedor_etiqueta = document.createElement("div")
                contenedor_etiqueta.classList.add("etiqueta")

                // Crear Etiqueta
                const etiqueta = document.createElement("p")
                etiqueta.classList.add("etiqueta__titulo")
                etiqueta.textContent = texto_etiqueta

                // Agregar a Contenedores
                contenedor_etiqueta.appendChild(etiqueta)
                contenedor_imagen.appendChild(contenedor_etiqueta)
            }

            // Agregar "Contenedor Imagenes" Antes de "Contenedor Informacion"
            const contenedor_informacion = document.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion) tarjeta_activa.appendChild(contenedor_imagen)
            else tarjeta_activa.insertBefore(contenedor_imagen, contenedor_informacion)
            break
        }
        case "titulo":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir Texto de Titulo
            const texto_titulo = prompt("📄Ingresa el Texto para el Titulo")
            if (texto_titulo == null || texto_titulo == "") return

            // Crear Titulo
            const titulo = document.createElement("p")
            titulo.classList.add("tarjeta__titulo", "bloque")
            titulo.textContent = texto_titulo
            contenedor_informacion.appendChild(titulo)

            // Agregar a Tarjeta
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        case "minititulo":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir Texto de Minititulo
            const texto_minititulo = prompt("📄Ingresa el Texto para el Minititulo")
            if (texto_minititulo == null || texto_minititulo == "") return

            // Crear Miniitulo
            const minititulo = document.createElement("p")
            minititulo.classList.add("tarjeta__fecha", "bloque")
            minititulo.textContent = texto_minititulo
            contenedor_informacion.appendChild(minititulo)

            // Agregar a Tarjeta
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        case "subtitulo":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir Texto de Subtitulo
            const texto_subtitulo = prompt("📄Ingresa el Texto para el Subtiulo")
            if (texto_subtitulo == null || texto_subtitulo == "") return

            // Crear Subtitulo
            const subtitulo = document.createElement("p")
            subtitulo.classList.add("tarjeta__subtitulo", "bloque")
            subtitulo.textContent = texto_subtitulo
            contenedor_informacion.appendChild(subtitulo)

            // Agregar a Tarjeta
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        case "parrafo":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir Texto de Parrafo
            const texto_parrafo = prompt("📄Ingresa el Texto para el Parrafo")
            if (texto_parrafo == null || texto_parrafo == "") return

            // Crear Parrafo
            const parrafo = document.createElement("p")
            parrafo.classList.add("tarjeta__descripcion", "bloque")
            parrafo.textContent = texto_parrafo
            contenedor_informacion.appendChild(parrafo)

            // Agregar a Tarjeta
            tarjeta_activa.appendChild(contenedor_informacion)
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
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir URL del Boton
            const url_pagina = prompt("🔗Ingresa la URL de la Pagina a Visitar")
            if (url_pagina == null || url_pagina == "") return

            // Crear Contenedor Boton
            const contenedor_boton = document.createElement("div")
            contenedor_boton.classList.add("div__boton", "bloque")

            // Crear Boton
            const boton = document.createElement("a")
            boton.classList.add("boton", "div__borde")
            boton.textContent = "Visitar"
            boton.href = url_pagina
            boton.target = "_blank"
            contenedor_boton.appendChild(boton)

            // Crear Icono
            const icono = document.createElement("ion-icon")
            icono.setAttribute("name", "open-outline")
            boton.appendChild(icono)

            // Crear Borde
            const borde = document.createElement("div")
            borde.classList.add("borde__inferior")
            boton.appendChild(borde)

            // Agregar a Tarjeta
            contenedor_informacion.appendChild(contenedor_boton)
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        case "boton_descargar":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir URL del Boton
            const url_descarga = prompt("🔗Ingresa la URL de la Descarga")
            if (url_descarga == null || url_descarga == "") return

            // Pedir Texto del Boton
            let texto_boton = prompt("🔗Ingresa el Texto del Boton")
            if (texto_boton == null || texto_boton == "") texto_boton = "Descargar"

            // Crear Contenedor Boton
            const contenedor_boton = document.createElement("div")
            contenedor_boton.classList.add("div__boton", "bloque")

            // Crear Boton
            const boton = document.createElement("a")
            boton.classList.add("boton", "descargar")
            boton.textContent = texto_boton
            boton.href = url_descarga
            boton.target = "_blank"
            contenedor_boton.appendChild(boton)

            // Crear Icono
            const icono = document.createElement("ion-icon")
            icono.setAttribute("name", "download-outline")
            boton.appendChild(icono)

            // Agregar a Tarjeta
            contenedor_informacion.appendChild(contenedor_boton)
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        default:
        {
            console.log("❓Elemento Desconocido")
        }
    }

    // Eliminar Placeholder
    const placeholder_tarjeta = tarjeta_activa.querySelector(".placeholder_tarjeta")
    if (placeholder_tarjeta) placeholder_tarjeta.remove()
}












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

















// const items = document.querySelectorAll(".item")
// const canvas = document.getElementById("canvas")

// let draggingType = null

// // === Arrastrar desde el panel ===
// items.forEach(item => {
//   item.addEventListener("dragstart", e => {
//     draggingType = item.dataset.type
//     e.dataTransfer.effectAllowed = "copy"
//   })
// })

// // === Soltar en el canvas ===
// canvas.addEventListener("dragover", e => {
//   e.preventDefault()
// })

// canvas.addEventListener("drop", e => {
//   e.preventDefault()
//   if (!draggingType) return

//   // Crear un bloque desde la plantilla
//   const templateHTML = templates[draggingType]
//   const wrapper = document.createElement("div")
//   wrapper.classList.add("bloque-wrapper")
//   wrapper.setAttribute("draggable", "true")
//   wrapper.innerHTML = templateHTML

//   // Quitar texto inicial si es el primer drop
//   const placeholder = canvas.querySelector(".placeholder")
//   if (placeholder) placeholder.remove()

//   canvas.appendChild(wrapper)

//   draggingType = null
//   activarReordenamiento()
// })

// // === Función para permitir reordenar los bloques dentro del canvas ===
// function activarReordenamiento() {
//   const bloques = canvas.querySelectorAll(".bloque-wrapper")

//   bloques.forEach(bloque => {
//     bloque.addEventListener("dragstart", e => {
//       e.dataTransfer.setData("text/plain", "")
//       bloque.classList.add("dragging")
//     })

//     bloque.addEventListener("dragend", e => {
//       bloque.classList.remove("dragging")
//     })
//   })

//   canvas.addEventListener("dragover", e => {
//     e.preventDefault()
//     const dragging = document.querySelector(".dragging")
//     const afterElement = getDragAfterElement(canvas, e.clientY)
//     if (afterElement == null) {
//       canvas.appendChild(dragging)
//     } else {
//       canvas.insertBefore(dragging, afterElement)
//     }
//   })
// }

// // === Calcular posición para insertar bloque mientras arrastras ===
// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll(".bloque-wrapper:not(.dragging)")]

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child }
//     } else {
//       return closest
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }
