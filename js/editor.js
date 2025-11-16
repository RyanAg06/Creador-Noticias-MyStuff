
/* === Mostrar/Ocultar HTML Generado === */
const btn_previsualizar_html = document.querySelector("#previsualizar_html")
const panel_html_generado = document.querySelector("#panel_html_generado")
btn_previsualizar_html.addEventListener("click", () =>
{
    panel_html_generado.classList.toggle("show")
    btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") ? "🚫Ocultar HTML" : "👁️Previsualizar HTML"
})










/* Boton Reordenamiento Tarjetas */
const boton_reordenar_tarjetas = document.querySelector("#reordenar_tarjetas")
let reordenamiento_tarjetas = false
boton_reordenar_tarjetas.addEventListener("click", e =>
{
    e.stopPropagation()

    // Si no Hay Ninguna Tarjeta Omitir
    if (document.querySelector(".placeholder_canva")) return

    boton_reordenar_tarjetas.classList.toggle("activo")
    reordenamiento_tarjetas = !reordenamiento_tarjetas

    if (boton_reordenar_tarjetas.classList.contains("activo"))
    {
        if (tarjeta_activa)
        {
            tarjeta_activa.classList.add("reordenando")
            tarjeta_activa.setAttribute("draggable", "true")

            // Activar Bloques
            const bloques = tarjeta_activa.querySelectorAll(".bloque")
            bloques.forEach(bloque => bloque.setAttribute("draggable", "false"))
        }
        boton_reordenar_tarjetas.textContent = "🚫Detener Reordenamiento"
    }
    else
    {
        if (tarjeta_activa)
        {
            tarjeta_activa.classList.remove("reordenando")
            tarjeta_activa.setAttribute("draggable", "false")

            // Desactivar Bloques
            const bloques = tarjeta_activa.querySelectorAll(".bloque")
            bloques.forEach(bloque => bloque.setAttribute("draggable", "true"))
        }
        boton_reordenar_tarjetas.textContent = "↕️Reordenar Tarjetas"
    }
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
let tarjeta_activa = null

// Crear Tarjeta Arrastrando un Elemento al Canva
canva.addEventListener("dragover", e =>
{
    e.stopPropagation()
    e.preventDefault()

    // Reordenar Tarjetas
    if (reordenamiento_tarjetas)
    {
        const tarjeta_anterior = obtener_anterior(canva, e.clientY, ".tarjeta:not(.tarjeta_dragging)")
        const tarjeta_arrastrada = document.querySelector(".tarjeta_dragging")

        // Verificar que Exista
        if (tarjeta_arrastrada)
        {
            if (tarjeta_anterior == null) canva.appendChild(tarjeta_arrastrada)
            else canva.insertBefore(tarjeta_arrastrada, tarjeta_anterior)
        }
    }
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
let reordenamiento_bloques = false
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

    // Boton Eliminar
    const boton_eliminar_tarjeta = document.createElement("button")
    boton_eliminar_tarjeta.textContent = "🗑️"
    boton_eliminar_tarjeta.classList.add("btn_eliminar_tarjeta")
    boton_eliminar_tarjeta.addEventListener("click", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.remove()

        const numero_tarjetas = canva.querySelectorAll(".tarjeta")

        // Crear un placeholder solo si NO hay uno ya agregado
        if (numero_tarjetas.length == 0)
        {
            const placeholder = document.createElement("p");
            placeholder.className = "placeholder_canva";
            placeholder.textContent = "Crea una Tarjeta o Arrastra un Elemento";
            canva.appendChild(placeholder);

            // Verificar si Esta En Modo Reordenamiento, Cancelar
            if (reordenamiento_tarjetas)
            {
                if (tarjeta_activa)
                {
                    tarjeta_activa.classList.remove("reordenando")
                    tarjeta_activa.setAttribute("draggable", "false")
        
                    // Desactivar Bloques
                    const bloques = tarjeta_activa.querySelectorAll(".bloque")
                    bloques.forEach(bloque => bloque.setAttribute("draggable", "true"))
                }
                reordenamiento_tarjetas = false
                boton_reordenar_tarjetas.classList.remove("activo")
                boton_reordenar_tarjetas.textContent = "↕️Reordenar Tarjetas"
            }
        }
    })
    tarjeta_nueva.appendChild(boton_eliminar_tarjeta)

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
        tarjeta_nueva.classList.add("tarjeta_dragging")
    })
    tarjeta_nueva.addEventListener("dragend", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.classList.remove("tarjeta_dragging")
    })
    tarjeta_nueva.addEventListener("dragleave", e =>
    {
        e.stopPropagation()
        tarjeta_nueva.classList.remove("tarjeta_hover")
    })
    tarjeta_nueva.addEventListener("dragover", e =>
    {
        e.stopPropagation()
        e.preventDefault()

        // Reordenar Bloques dentro de la tarjeta
        if (reordenamiento_bloques && tarjeta_nueva.classList.contains("activa"))
        {
            const contenedor_informacion = tarjeta_nueva.querySelector(".tarjeta__informacion")
            if (contenedor_informacion)
            {
                const bloque_anterior = obtener_anterior(contenedor_informacion, e.clientY, ".bloque:not(.block_dragging)")
                const bloque_arrastrado = tarjeta_nueva.querySelector(".block_dragging")
                
                if (bloque_arrastrado)
                {
                    if (bloque_anterior == null) contenedor_informacion.appendChild(bloque_arrastrado)
                    else contenedor_informacion.insertBefore(bloque_arrastrado, bloque_anterior)
                }
            }
        }
        // Agregar elementos nuevos
        else if (tarjeta_nueva.classList.contains("activa") && tipo_elemento && !reordenamiento_tarjetas) tarjeta_nueva.classList.add("tarjeta_hover")
    })
    tarjeta_nueva.addEventListener("drop", e =>
    {
        e.stopPropagation()

        // Eliminar Clase
        tarjeta_nueva.classList.remove("tarjeta_hover")

        // Solo Permitir Agregar Elementos si Esta Activa Y Es un Elemento
        if (tarjeta_nueva.classList.contains("activa") && tipo_elemento) agregar_elementos()
    })
    
    // Agregar Dentro de Canva
    canva.appendChild(tarjeta_nueva)
}
function desactivar_tarjetas_anteriores ()
{
    canva.querySelectorAll(".tarjeta").forEach(tarjeta =>
    {
        tarjeta.classList.remove("activa")
        tarjeta.setAttribute("draggable", "false")

        // Editar Placeholder
        const placeholder_tarjeta = tarjeta.querySelector(".placeholder_tarjeta")
        if (placeholder_tarjeta) placeholder_tarjeta.textContent = "🔒Tarjeta Inactiva"

        // Desactivar Reordenamineto de Tarjetas
        if (tarjeta.classList.contains("reordenando"))
        {
            tarjeta_activa.setAttribute("draggable", "false")
            tarjeta.classList.remove("reordenando")
        }

        // Desactivar Bloques
        let bloques = tarjeta.querySelectorAll(".bloque")
        bloques.forEach(bloque => bloque.setAttribute("draggable", "false"))
    })
}
function activar_tarjeta (tarjeta)
{
    tarjeta_activa = tarjeta
    tarjeta_activa.classList.add("activa")

    // Editar Placeholder
    const placeholder_tarjeta = tarjeta.querySelector(".placeholder_tarjeta")
    if (placeholder_tarjeta) placeholder_tarjeta.textContent = "✅Tarjeta Activa"

    // Activar Reordenamineto de Tarjetas
    if (reordenamiento_tarjetas)
    {
        tarjeta_activa.setAttribute("draggable", "true")
        tarjeta_activa.classList.add("reordenando")
        return
    }

    // Activar Bloques
    const bloques = tarjeta_activa.querySelectorAll(".bloque")
    bloques.forEach(bloque => bloque.setAttribute("draggable", "true"))
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
    if (tarjeta_activa.classList.contains("reordenando")) return

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
            titulo.setAttribute("draggable", "true")

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
            minititulo.setAttribute("draggable", "true")
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
            subtitulo.setAttribute("draggable", "true")
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
            parrafo.setAttribute("draggable", "true")
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
            contenedor_boton.setAttribute("draggable", "true")

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
            let texto_boton = prompt("📄Ingresa el Texto del Boton")
            if (texto_boton == null || texto_boton == "") texto_boton = "Descargar"

            // Crear Contenedor Boton
            const contenedor_boton = document.createElement("div")
            contenedor_boton.classList.add("div__boton", "bloque")
            contenedor_boton.setAttribute("draggable", "true")

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
            alert("❓Elemento Desconocido")
            return
        }
    }

    // Agregar listeners a TODOS los bloques de la tarjeta activa
    const bloques = tarjeta_activa.querySelectorAll(".bloque")
    bloques.forEach(bloque =>
    {
        // Remover listeners anteriores si existen (evitar duplicados)
        bloque.removeEventListener("dragstart", dragstart_block)
        bloque.removeEventListener("dragend", dragend_block)
        
        // Agregar nuevos listeners
        bloque.addEventListener("dragstart", dragstart_block)
        bloque.addEventListener("dragend", dragend_block)

        // Solo agregar botón si NO tiene uno ya
        if (!bloque.querySelector(".btn_eliminar_bloque"))
        {
            let btn_eliminar_bloque = document.createElement("button")
            btn_eliminar_bloque.classList.add("btn_eliminar_bloque")
            btn_eliminar_bloque.addEventListener("click", e =>
            {
                e.stopPropagation()
                bloque.remove()
                
                // Si No Quedan Bloques, Crear Placeholder
                const bloques_restantes = tarjeta_activa.querySelectorAll(".bloque")
                if (bloques_restantes.length === 0 && !tarjeta_activa.querySelector(".placeholder_tarjeta"))
                {
                    const placeholder = document.createElement("p")
                    placeholder.classList.add("placeholder_tarjeta")
                    placeholder.textContent = "✅Tarjeta Activa"
                    tarjeta_activa.appendChild(placeholder)
                }
            })
            btn_eliminar_bloque.textContent = "🗑️"
            bloque.appendChild(btn_eliminar_bloque)
        }
    })

    // Eliminar Placeholder
    const placeholder_tarjeta = tarjeta_activa.querySelector(".placeholder_tarjeta")
    if (placeholder_tarjeta) placeholder_tarjeta.remove()
}
// Funciones Para los Bloques
function dragstart_block(e)
{
    e.stopPropagation()
    this.classList.add("block_dragging")
    reordenamiento_bloques = true
}
function dragend_block(e)
{
    e.stopPropagation()
    this.classList.remove("block_dragging")
    reordenamiento_bloques = false
}












/* === Drag and Drop: Reordenamiento === */
function obtener_anterior(container, y, clase)
{
    const tarjetas = [...container.querySelectorAll(clase)]
    return tarjetas.reduce((closest, child) =>
    {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child }
        else return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
}