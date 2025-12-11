
/* === Mostrar/Ocultar HTML Generado (Falta Mostrar HTML 📌) === */
const canva = document.querySelector("#canva")
const btn_previsualizar_html = document.querySelector("#previsualizar_html")
const panel_html_generado = document.querySelector("#panel_html_generado")
recargar_html()

// Verificar Estado Boton Previsualizar
if (panel_html_generado.classList.contains("show")) btn_previsualizar_html.textContent = "🚫Ocultar Previsualizacion"

// Boton Previsualizar HTML
btn_previsualizar_html.addEventListener("click", () =>
{
    panel_html_generado.classList.toggle("show")
    btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") ? "🚫Ocultar Previsualizacion" : "👁️Ver Previsualizacion"
    recargar_html()
})
function recargar_html ()
{
    const copia_canva = canva.cloneNode(true) // Clonar Canva
    const contenedor_titulos = document.querySelector(".titulos_superiores") // Contenedor Titulos 
    const texto_titulo_pagina = contenedor_titulos.querySelector(".titulo_pagina").textContent // Obtener Titulo
    const texto_subtitulo_pagina = contenedor_titulos.querySelector(".subtitulo_pagina").textContent // Obtener Subtitulo
    const preview_tarjetas = document.querySelector(".tarjetas") // Contenedor tarjetas Preview

    // Centrar Titulos
    if (contenedor_titulos.classList.contains("centrados")) panel_html_generado.querySelector(".titulos").classList.add("centro")
    else panel_html_generado.querySelector(".titulos").classList.remove("centro")

    // Cargar Titulos
    panel_html_generado.querySelector(".titulos__titulo").textContent = texto_titulo_pagina
    panel_html_generado.querySelector(".titulos__subtitulo").textContent = texto_subtitulo_pagina

    // Cambiar Modo Tarjetas
    if (canva.classList.contains("vertical")) preview_tarjetas.classList.add("vertical")
    else preview_tarjetas.classList.remove("vertical")

    // Cargar Tarjetas
    limpiar_elementos(copia_canva)
    preview_tarjetas.innerHTML = copia_canva.innerHTML
}










/* === Reordenamiento de Tarjetas ✅ === */
const boton_reordenar_tarjetas = document.querySelector("#reordenar_tarjetas")
const listas_elementos = document.querySelectorAll(".lista_elementos")
let numero_tarjetas = 0
let reordenamiento_tarjetas = false

// Boton Reordenamiento de Tarjetas
boton_reordenar_tarjetas.addEventListener("click", e =>
{
    e.stopPropagation()

    // Verificar si solo Hay Menos de 1 Tarjeta, Omitir
    if (numero_tarjetas <= 1) return

    // Activar/Descativar
    if (boton_reordenar_tarjetas.classList.contains("activo")) desactivar_reordenamiento()
    else activar_reordenamiento()
})
function desactivar_reordenamiento ()
{
    // Desactivar Reordenamiento
    reordenamiento_tarjetas = false
    boton_reordenar_tarjetas.classList.remove("activo")

    // Activar Elementos Disponibles
    listas_elementos.forEach(lista => lista.classList.remove("bloqueado"))
    const elementos = document.querySelectorAll(".item")
    elementos.forEach(elemento => elemento.setAttribute("draggable", "true"))

    // Verificar si hay Una Tarjeta Activa
    if (tarjeta_activa)
    {
        // Eliminar Clase y Draggable
        tarjeta_activa.classList.remove("reordenando")
        tarjeta_activa.setAttribute("draggable", "false")

        // Desactivar Bloques
        const bloques = tarjeta_activa.querySelectorAll(".bloque")
        bloques.forEach(bloque => bloque.setAttribute("draggable", "true"))
    }
    boton_reordenar_tarjetas.textContent = "↕️Reordenar Tarjetas"
}
function activar_reordenamiento ()
{
    // Activar Reordenamiento
    reordenamiento_tarjetas = true
    boton_reordenar_tarjetas.classList.add("activo")

    // Desactivar Elementos Disponibles
    listas_elementos.forEach(lista => lista.classList.add("bloqueado"))
    const elementos = document.querySelectorAll(".item")
    elementos.forEach(elemento => elemento.setAttribute("draggable", "false"))

    // Verificar si hay Una Tarjeta Activa
    if (tarjeta_activa)
    {
        // Eliminar Clase y Draggable
        tarjeta_activa.classList.add("reordenando")
        tarjeta_activa.setAttribute("draggable", "true")

        // Activar Bloques
        const bloques = tarjeta_activa.querySelectorAll(".bloque")
        bloques.forEach(bloque => bloque.setAttribute("draggable", "false"))
    }
    boton_reordenar_tarjetas.textContent = "🚫Detener Reordenamiento"
}








/* === Botones Zona Edicion (Falta Centrar y Editar Ambos Titulos ✅) === */
const btn_centrar_titulos = document.querySelector("#centrar_titulos")
const contenedor_titulos = document.querySelector(".titulos_superiores")

// Editar Titulo
const titulo_pagina = document.querySelector(".titulo_pagina")
const btn_editar_titulo_pagina = document.querySelector(".editar_titulo")
btn_editar_titulo_pagina.addEventListener("click", e =>
{
    e.stopPropagation()

    // Pedir texto Titulo
    const texto_titulo = prompt("Ingresa el Titulo Principal", titulo_pagina.textContent)

    // Cancelar si Esta Vacio
    if (texto_titulo == null || texto_titulo == "") return

    // Cambiar Texto
    titulo_pagina.textContent = texto_titulo
    recargar_html()
})

// Editar Subtitulo Pagina
const subtitulo_pagina = document.querySelector(".subtitulo_pagina")
const btn_editar_subtitulo_pagina = document.querySelector(".editar_subtitulo")
const btn_cambiar_modo = document.querySelector("#cambiar_modo")

btn_editar_subtitulo_pagina.addEventListener("click", e =>
{
    e.stopPropagation()

    // Pedir texto Titulo
    const texto_subtitulo = prompt("Ingresa el Titulo Principal", subtitulo_pagina.textContent)

    // Cancelar si Esta Vacio
    if (texto_subtitulo == null || texto_subtitulo == "") return

    // Cambiar Texto
    subtitulo_pagina.textContent = texto_subtitulo
    recargar_html()
})

// Verificar Estado Botones
if (!contenedor_titulos.classList.contains("centrados")) btn_centrar_titulos.textContent = "⬅️Lado Izquierdo"
if (!canva.classList.contains("vertical")) btn_cambiar_modo.textContent = "#️⃣Modo Cuadricula"

// Boton Centrar Titulos
btn_centrar_titulos.addEventListener("click", () =>
{
    contenedor_titulos.classList.toggle("centrados")
    btn_centrar_titulos.textContent = (contenedor_titulos.classList.contains("centrados") ? "↔️Titulos Centrados" : "⬅️Lado Izquierdo")
    recargar_html()
})

// Boton Cambiar Modo de Vista
btn_cambiar_modo.addEventListener("click", () =>
{
    canva.classList.toggle("vertical")
    btn_cambiar_modo.textContent = (canva.classList.contains("vertical") ? "↕️Modo Vertical" : "#️⃣Modo Cuadricula")
    recargar_html()
})








/* === Crear Tarjeta ✅ === */
let tarjeta_activa = null
let reordenamiento_bloques = false

// Crear Tarjeta Arrastrando un Elemento al Canva
canva.addEventListener("dragover", e =>
{
    e.stopPropagation()
    e.preventDefault()
})
canva.addEventListener("drop", e =>
{
    e.stopPropagation()

    // Crear Tarjeta Si Suelta Elemento Encima y No Existen Tarjetas
    if (tipo_elemento && numero_tarjetas == 0)
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
    // Eliminar Placeholder si Existe y Desactivar Anteriores
    const placeholder_canva = canva.querySelector(".placeholder_canva")
    if (placeholder_canva) placeholder_canva.remove()
    desactivar_tarjetas_anteriores()

    // Crear Tarjeta
    const tarjeta_nueva = document.createElement("section")
    tarjeta_nueva.classList.add("tarjeta")

    // Boton Eliminar Tarjeta
    const boton_eliminar_tarjeta = document.createElement("button")
    boton_eliminar_tarjeta.textContent = "🗑️"
    boton_eliminar_tarjeta.classList.add("btn_eliminar_tarjeta")
    tarjeta_nueva.appendChild(boton_eliminar_tarjeta)
    boton_eliminar_tarjeta.addEventListener("click", e =>
    {
        e.stopPropagation()
        eliminar_tarjeta(tarjeta_nueva)
    })

    // Agregar Placeholder a Tarjeta Nueva y Activarla
    const placeholder_tarjeta = document.createElement("p")
    placeholder_tarjeta.classList.add("placeholder_tarjeta")
    tarjeta_nueva.appendChild(placeholder_tarjeta)
    activar_tarjeta(tarjeta_nueva)

    // Evento Click
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
        else activar_tarjeta(tarjeta_nueva)
    })




    /* === Eventos de Reordenamiento Tarjetas ✅ === */
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

        // Reordenamiento Bloques
        if (tarjeta_nueva.classList.contains("activa") && reordenamiento_bloques)
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
            recargar_html()
        }

         // Reordenamiento Tarjetas
        else if (reordenamiento_tarjetas)
        {
            const tarjeta_anterior = obtener_anterior(canva, e.clientY, ".tarjeta:not(.tarjeta_dragging)")
            const tarjeta_arrastrada = document.querySelector(".tarjeta_dragging")
    
            if (tarjeta_arrastrada)
            {
                if (tarjeta_anterior == null) canva.appendChild(tarjeta_arrastrada)
                else canva.insertBefore(tarjeta_arrastrada, tarjeta_anterior)
            }
            recargar_html()
        }

        // Agregar Clase para que se Haga Azul al Pasar un Elemento Encima de la Tarjeta
        else if (tarjeta_nueva.classList.contains("activa") && tipo_elemento && !reordenamiento_tarjetas) tarjeta_nueva.classList.add("tarjeta_hover")
    })

    // Crear Elemento al Soltar en la Tarjeta
    tarjeta_nueva.addEventListener("drop", e =>
    {
        e.stopPropagation()

        // Eliminar Clase Hover para que se Haga Azul
        tarjeta_nueva.classList.remove("tarjeta_hover")

        // Solo Agregar Elementos si Esta Activa Y Es un Elemento
        if (tarjeta_nueva.classList.contains("activa") && tipo_elemento) agregar_elementos()
    })
    
    // Agregar Tarjeta al Canva y Obtener Numero Tarjetas
    canva.appendChild(tarjeta_nueva)
    numero_tarjetas = canva.querySelectorAll(".tarjeta").length

    recargar_html()
}
function eliminar_tarjeta (tarjeta)
{
    // Eliminar Tarjeta y Obtener Numero Tarjetas
    tarjeta.remove()
    numero_tarjetas = canva.querySelectorAll(".tarjeta").length

    // Verificar si ya NO hay mas Tarjetas
    if (numero_tarjetas == 0)
    {
        // Crear un Placeholder
        const placeholder = document.createElement("p");
        placeholder.className = "placeholder_canva";
        placeholder.textContent = "⭐Crea una Tarjeta o Arrastra un Elemento";
        canva.appendChild(placeholder)

        // Verificar si Esta En Modo Reordenamiento, Cancelar
        if (reordenamiento_tarjetas) desactivar_reordenamiento()
    }

    // Si esta Reordenando y Solo Queda 1 Tarjeta, Cancelar Reordenamiento
    if (reordenamiento_tarjetas && numero_tarjetas <= 1) desactivar_reordenamiento()

    recargar_html()
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
    // Activar Tarjeta
    tarjeta_activa = tarjeta
    tarjeta_activa.classList.add("activa")

    // Editar Placeholder
    const placeholder_tarjeta = tarjeta.querySelector(".placeholder_tarjeta")
    if (placeholder_tarjeta) placeholder_tarjeta.textContent = "✅Tarjeta Activa"

    // Activar Reordenamineto de Tarjetas si esta Reordenando Tarjetas
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











/* === Agregar Elementos Dentro de Tarjetas === */
const elementos = document.querySelectorAll(".item")
let tipo_elemento = null

function obtener_ruta_aleatoria()
{
    const rutas_imagen_defecto = [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fm%2FwCrZqAL1cWMAAAAC%2Fspinning-fish.gif&f=1&nofb=1&ipt=435d6d8ca1000bf77f32d403bde4060bcdff4d45f39711291be9406f810f233c",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia4.giphy.com%2Fmedia%2Fv1.Y2lkPTc5MGI3NjExejYwN3MxYTRjZm5ubHk1c2s0enluODAzMTUyOGZqa2tseHZtOXh0cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n%2FCPlkqEvq8gRDW%2F200.gif&f=1&nofb=1&ipt=a02f287e44c68175a1c190d48ac71d57f87356bfaf93fe3ac7d7ea7fcd9c2c82",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2Fue7Q8JmP_0MAAAAM%2Foiia-oiiaoiia.gif&f=1&nofb=1&ipt=ced626dca28341f0b94dd1fb4f5bbac234ae22b9641c7f55e3cb037a6a94717c",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.FYRMiETGyJyo7rh68knMHQHaHa%3Fpid%3DApi&f=1&ipt=935961266a57c630253c3dde398f21e1232671985a27a55b0b043f7f01f546d4&ipo=images"
    ]
    let id = (Math.floor(Math.random() * (rutas_imagen_defecto.length)))
    return rutas_imagen_defecto[id]
}

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
    // NO Agregar Elementos si esta Reordenando
    if (tarjeta_activa.classList.contains("reordenando")) return

    /* === Agregar Elementos (Falta Optimizacion 📌) === */
    switch (tipo_elemento)
    {
        case "imagen":
        {
            // Crear Contenedor Imagenes si no Existe (Solo 1 Por Tarjeta)
            let contenedor_imagen = tarjeta_activa.querySelector(".tarjeta__imagenes")
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
            const ruta = prompt("🔗Ingresa la Ruta de la Imagen").trim()
            if (ruta == null || ruta == "") return

            // Crear Imagen Fondo
            const imagen_fondo = document.createElement("img")
            imagen_fondo.classList.add("tarjeta__imagen-fondo")
            imagen_fondo.alt = "Imagen Fondo"
            imagen_fondo.src = ruta
            contenedor_imagen.appendChild(imagen_fondo)

            // Crear Imagen
            const imagen = document.createElement("img")
            imagen.classList.add("tarjeta__imagen")
            imagen.alt = "Imagen"
            imagen.src = ruta
            contenedor_imagen.appendChild(imagen)

            // Cargar Ruta por Defecto si hay Error
            imagen.onerror = function() {
                imagen_fondo.src = obtener_ruta_aleatoria()
                imagen.src = imagen_fondo.src
                recargar_html()
            }

            // Pedir Texto Etiqueta
            const texto_etiqueta = prompt("📄Ingresa Texto de Etiqueta (Vacio para Omitir)").trim()

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
            const contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
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
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Calcular ID
            const id = canva.querySelectorAll(".slider").length

            // Crear Contenedor Slider
            const contenedor_slider = document.createElement("div")
            contenedor_slider.classList.add("slider", "bloque")
            contenedor_slider.id = `slider${id}`
            
            // Crear Contenedor Imagenes
            const contenedor_imagenes = document.createElement("div")
            contenedor_imagenes.classList.add("slider__imagenes")

            // Pedir Rutas
            let input = null
            let rutas = []
            do
            {
                input = prompt("Ingresa la Ruta de la Imagen\n-0 para Salir")
                if (input == null || input == "0") break
                if (input.trim() !== "") rutas.push(input)
            }
            while(true)

            // Crear Imagenes
            rutas.forEach(ruta =>
            {
                const imagen = document.createElement("img")
                imagen.classList.add("slider__imagen")
                imagen.src = ruta
                imagen.onerror = function() {
                    imagen.src = obtener_ruta_aleatoria()
                    recargar_html()
                }
                contenedor_imagenes.appendChild(imagen)
            })

            // Crear Boton Izquierda
            const btn_izquierda = document.createElement("ion-icon")
            btn_izquierda.setAttribute("name", "chevron-back-outline")
            btn_izquierda.classList.add("slider-boton", "boton-izquierda")
            btn_izquierda.setAttribute("onclick", `moverIzquierda('slider${id}')`)

            // Crear Boton Derecha
            const btn_derecha = document.createElement("ion-icon")
            btn_derecha.setAttribute("name", "chevron-forward-outline")
            btn_derecha.classList.add("slider-boton", "boton-derecha")
            btn_derecha.setAttribute("onclick", `moverDerecha('slider${id}')`)
            
            // Agregar a Tarjetas
            contenedor_slider.appendChild(contenedor_imagenes)
            contenedor_slider.appendChild(btn_izquierda)
            contenedor_slider.appendChild(btn_derecha)
            contenedor_informacion.appendChild(contenedor_slider)
            tarjeta_activa.appendChild(contenedor_informacion)
            recargar_sliders()
            break
        }
        case "lista":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Crear Lista
            const lista = document.createElement("ul")
            lista.classList.add("tarjeta__lista", "bloque")

            // Pedir Titulo
            const texto_titulo = prompt("Ingresa el Titulo, Vacio para Omitir")
            const titulo = document.createElement("b")
            titulo.textContent = texto_titulo

            // Pedir Elementos
            let input = null
            let elementos = []
            do
            {
                input = prompt("Ingresa el Texto para el Elemento\n-0 para Salir")
                if (input !== "0" && input !== "") elementos.push(input)
            }
            while(input !== "0")

            // Si No hay Elementos, Salir
            if (elementos.length === 0)
            {
                crear_placeholder_tarjeta()
                break
            }

            // Agregar Titulo
            lista.appendChild(titulo)
            
            // Agregar Elementos
            elementos.forEach(elemento =>
            {
                const li = document.createElement("li")
                li.textContent = elemento
                lista.appendChild(li)
            })

            // Agregar a Tarjeta
            contenedor_informacion.appendChild(lista)
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        case "codigo":
        {
            // Crear Contenedor Informacion si no Existe
            let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion")
            if (!contenedor_informacion)
            {
                contenedor_informacion = document.createElement("div")
                contenedor_informacion.classList.add("tarjeta__informacion")
            }

            // Pedir Codigo
            const texto_codigo = prompt("Ingresa el Codigo a Copiar")
            if (texto_codigo === null || texto_codigo === null) return
            
            const contenedor_texto_codigo = document.createElement("p") 
            contenedor_texto_codigo.textContent = texto_codigo

            // Crear Contenedor Codigo
            const contenedor_codigo = document.createElement("div")
            contenedor_codigo.classList.add("tarjeta__codigo", "bloque")

            // Calcular ID
            let id = canva.querySelectorAll(".codigo").length
            console.log(id)

            // Crear Boton
            const btn_copiar = document.createElement("a")
            btn_copiar.textContent = "Copiar "
            btn_copiar.classList.add("copiar")
            btn_copiar.setAttribute("onclick", `copiarPortapapeles('codigo${id}')`)
            contenedor_codigo.appendChild(btn_copiar)

            // Crear Icono Boton
            const icono = document.createElement("ion-icon")
            icono.setAttribute("name", "clipboard-outline")
            btn_copiar.appendChild(icono)

            // Crear Bloque de Codigo
            const codigo = document.createElement("span")
            codigo.classList.add("codigo") 
            codigo.id = `codigo${id}`
            codigo.appendChild(contenedor_texto_codigo)
            contenedor_codigo.appendChild(codigo)
            
            // Agregar a Tarjeta
            contenedor_informacion.appendChild(contenedor_codigo)
            tarjeta_activa.appendChild(contenedor_informacion)
            break
        }
        // case "select":
        // {
        //     console.log("Select agregado")
        //     break
        // }
        

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

    /* === Agregar listeners y Botones de Edicion a Bloques ✅ === */
    const bloques = tarjeta_activa.querySelectorAll(".bloque")
    bloques.forEach(bloque =>
    {
        // Remover listeners Pnteriores para evitar Duplicados
        bloque.removeEventListener("dragstart", dragstart_block)
        bloque.removeEventListener("dragend", dragend_block)
        
        // Agregar Nuevos listeners
        bloque.addEventListener("dragstart", dragstart_block)
        bloque.addEventListener("dragend", dragend_block)

        // Boton Agregar Elementos (Listas)
        if (bloque.classList.contains("tarjeta__lista"))
        {
            if (!bloque.querySelector(".btn_agregar_elementos"))
            {
                const btn_agregar_elementos = document.createElement("button")
                btn_agregar_elementos.classList.add("btn_agregar_elementos")
                btn_agregar_elementos.textContent = "➕"
                btn_agregar_elementos.addEventListener("click", e =>
                {
                    e.stopPropagation()

                    // Pedir Elementos
                    let input = null
                    let elementos = []
                    do
                    {
                        input = prompt("Ingresa el Texto para el Elemento Nuevo\n-0 para Salir")
                        if (input !== "0") elementos.push(input)
                    }
                    while(input !== "0" || input == null)
                    
                    // Agregar Elementos
                    elementos.forEach(elemento =>
                    {
                        const li = document.createElement("li")
                        li.textContent = elemento
                        bloque.appendChild(li)
                    })
                    recargar_html()
                })
                bloque.appendChild(btn_agregar_elementos)
            }
        }

        // Boton Agregar Elementos (Sliders)
        else if (bloque.classList.contains("slider"))
        {
            if (!bloque.querySelector(".btn_agregar_elementos"))
            {
                const btn_agregar_elementos = document.createElement("button")
                btn_agregar_elementos.classList.add("btn_agregar_elementos")
                btn_agregar_elementos.textContent = "➕"
                btn_agregar_elementos.addEventListener("click", e =>
                {
                    e.stopPropagation()

                    // Pedir Elementos
                    let input = null
                    let rutas = []
                    do
                    {
                        input = prompt("Ingresa la Nueva Ruta Nuevo\n-0 para Salir")
                        if (input !== "0") rutas.push(input)
                    }
                    while(input !== "0")
                    
                    // Agregar Elementos
                    const contenedor_imagenes = bloque.querySelector(".slider__imagenes")
                    rutas.forEach(ruta =>
                    {

                        const imagen = document.createElement("img")
                        imagen.classList.add("slider__imagen")
                        imagen.src = ruta
                        imagen.onerror = function() {
                            imagen.src = obtener_ruta_aleatoria()
                            recargar_html()
                        }
                        contenedor_imagenes.appendChild(imagen)
                    })
                    recargar_sliders()
                    recargar_html()
                })
                bloque.appendChild(btn_agregar_elementos)
            }
        }

        // Solo Agregar Boton Editar si no Tiene Uno
        if (!bloque.querySelector(".btn_editar_bloque"))
        {
            let btn_editar_bloque = document.createElement("button")
            btn_editar_bloque.classList.add("btn_editar_bloque")
            btn_editar_bloque.textContent = "✏️"
            btn_editar_bloque.addEventListener("click", e =>
            {
                e.stopPropagation()
                editar_bloque(bloque)
            })
            bloque.appendChild(btn_editar_bloque)
        }

        // Solo Agregar Boton Eliminar si no Tiene Uno
        if (!bloque.querySelector(".btn_eliminar_bloque"))
        {
            let btn_eliminar_bloque = document.createElement("button")
            btn_eliminar_bloque.classList.add("btn_eliminar_bloque")
            btn_eliminar_bloque.textContent = "🗑️"
            btn_eliminar_bloque.addEventListener("click", e =>
            {
                e.stopPropagation()
                bloque.remove()
                crear_placeholder_tarjeta()
                recargar_html()
            })
            bloque.appendChild(btn_eliminar_bloque)
        }
    })

    /* === Agregar Botones de Edicion a la Imagen si Existe ✅ === */
    const contenedor_imagen = tarjeta_activa.querySelector(".tarjeta__imagenes")
    if (contenedor_imagen)
    {
        // Agregar Botón Editar si no Tiene uno ya
        if (!contenedor_imagen.querySelector(".btn_editar_imagen"))
        {
            const btn_editar_imagen = document.createElement("button")
            btn_editar_imagen.classList.add("btn_editar_imagen")
            btn_editar_imagen.textContent = "✏️"
            btn_editar_imagen.addEventListener("click", e =>
            {
                e.stopPropagation()
                
                // Editar Ruta de Imagen
                const imagen = contenedor_imagen.querySelector(".tarjeta__imagen")
                const imagen_fondo = contenedor_imagen.querySelector(".tarjeta__imagen-fondo")
                const nueva_ruta = prompt("🔗Edita la Ruta de la Imagen", imagen.src)
                if (nueva_ruta !== null && nueva_ruta !== "")
                {
                    imagen.src = nueva_ruta
                    imagen_fondo.src = nueva_ruta
                }

                // Cargar Ruta por Defecto si hay Error
                imagen.onerror = function() {
                    imagen_fondo.src = obtener_ruta_aleatoria()
                    imagen.src = imagen_fondo.src
                    recargar_html()
                }
                
                // Editar Etiqueta si Existe
                let etiqueta = contenedor_imagen.querySelector(".etiqueta__titulo")
                if (etiqueta)
                {
                    // Pedir Texto Nuevo para Etiqueta
                    const texto_nueva_etiqueta = prompt("📄Edita el Texto de la Etiqueta", etiqueta.textContent)

                    // Eliminar Etiqueta si Esta Vacia, sino Cambiar Texto
                    if (texto_nueva_etiqueta == null || texto_nueva_etiqueta == "") etiqueta.closest(".etiqueta").remove()
                    else etiqueta.textContent = texto_nueva_etiqueta
                }

                // Si no Hay Etiqueta, Preguntar Si Quiere Agregar Tarjeta
                else
                {
                    // Pedir Texto Etiqueta
                    const texto_etiqueta = prompt("📄Agregar Texto de Etiqueta (Vacío para Omitir)")

                    // Agregar Etiqueta si NO esta Vacia
                    if (texto_etiqueta != null && texto_etiqueta != "")
                    {
                        // Crear Contenedor Etiqueta
                        const contenedor_etiqueta = document.createElement("div")
                        contenedor_etiqueta.classList.add("etiqueta")
                        
                        // Crear Etiqueta
                        const nueva_etiqueta = document.createElement("p")
                        nueva_etiqueta.classList.add("etiqueta__titulo")
                        nueva_etiqueta.textContent = texto_etiqueta
                        contenedor_etiqueta.appendChild(nueva_etiqueta)
                        
                        // Agregar a Contenedor Imagenes
                        contenedor_imagen.appendChild(contenedor_etiqueta)
                    }
                }
                recargar_html()
            })

            // Agregar Boton Editar a Contenedor Imagen
            contenedor_imagen.appendChild(btn_editar_imagen)
        }
        
        // Agregar Boton Eliminar si no Tiene uno ya
        if (!contenedor_imagen.querySelector(".btn_eliminar_imagen"))
        {
            // Crear Boton
            const btn_eliminar_imagen = document.createElement("button")
            btn_eliminar_imagen.classList.add("btn_eliminar_imagen")
            btn_eliminar_imagen.textContent = "🗑️"
            btn_eliminar_imagen.addEventListener("click", e =>
            {
                e.stopPropagation()
                contenedor_imagen.remove()
                crear_placeholder_tarjeta()
                recargar_html()
            })

            // Agregar Boton a Contenedor Imagen
            contenedor_imagen.appendChild(btn_eliminar_imagen)
        }
    }

    // Eliminar Placeholder
    const placeholder_tarjeta = tarjeta_activa.querySelector(".placeholder_tarjeta")
    if (placeholder_tarjeta) placeholder_tarjeta.remove()
    recargar_html()
}
function crear_placeholder_tarjeta ()
{
    // Si No Quedan Bloques, Crear Placeholder
    const bloques_restantes = tarjeta_activa.querySelectorAll(".bloque").length
    if (bloques_restantes == 0 && !tarjeta_activa.querySelector(".tarjeta__imagenes"))
    {
        const placeholder = document.createElement("p")
        placeholder.classList.add("placeholder_tarjeta")
        placeholder.textContent = "✅Tarjeta Activa"
        tarjeta_activa.appendChild(placeholder)
    }

    // Si No Quedan mas Bloques, Eliminar Contenedor Informacion
    if (bloques_restantes == 0 && tarjeta_activa.querySelector(".tarjeta__informacion")) tarjeta_activa.querySelector(".tarjeta__informacion").remove()
}
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











/* === Editar Bloque Existente ✅ === */
function editar_bloque(bloque)
{
    // Obtener el Texto del bloque SIN los Botones
    const obtener_texto = (elemento) =>
    {
        return Array.from(elemento.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent)
            .join('')
            .trim()
    }
    
    // Actualizar Texto
    const actualizar_texto = (elemento, nuevo_texto) =>
    {
        // Encontrar el nodo de texto y actualizarlo
        const nodo_texto = Array.from(elemento.childNodes).find(node => node.nodeType === Node.TEXT_NODE)
        
        // Si no existe nodo de texto, insertarlo al inicio
        if (nodo_texto) nodo_texto.textContent = nuevo_texto
        else elemento.insertBefore(document.createTextNode(nuevo_texto), elemento.firstChild)
    }
    
    // Obtener Clase del Bloque
    let tipo_bloque = ""
    if (bloque.classList.contains("tarjeta__titulo")) tipo_bloque = "titulo"
    else if (bloque.classList.contains("tarjeta__fecha")) tipo_bloque = "fecha"
    else if (bloque.classList.contains("tarjeta__subtitulo")) tipo_bloque = "subtitulo"
    else if (bloque.classList.contains("tarjeta__descripcion")) tipo_bloque = "descripcion"
    else if (bloque.classList.contains("slider")) tipo_bloque = "slider"
    else if (bloque.classList.contains("tarjeta__lista")) tipo_bloque = "lista"
    else if (bloque.classList.contains("tarjeta__codigo")) tipo_bloque = "codigo"
    else if (bloque.classList.contains("div__boton")) tipo_bloque = "boton"

    // Identificar el Tipo de Bloque
    switch (tipo_bloque)
    {
        case "titulo":
        {
            const texto_actual = obtener_texto(bloque)
            const nuevo_texto = prompt("📄Edita el Texto del Titulo", texto_actual)
            if (nuevo_texto !== null && nuevo_texto !== "") actualizar_texto(bloque, nuevo_texto)
            break
        }
        case "fecha":
        {
            const texto_actual = obtener_texto(bloque)
            const nuevo_texto = prompt("📄Edita el Texto del Minititulo", texto_actual)
            if (nuevo_texto !== null && nuevo_texto !== "") actualizar_texto(bloque, nuevo_texto)
            break
        }
        case "subtitulo":
        {
            const texto_actual = obtener_texto(bloque)
            const nuevo_texto = prompt("📄Edita el Texto del Subtitulo", texto_actual)
            if (nuevo_texto !== null && nuevo_texto !== "") actualizar_texto(bloque, nuevo_texto)
            break
        }
        case "descripcion":
        {
            const texto_actual = obtener_texto(bloque)
            const nuevo_texto = prompt("📄Edita el Texto del Parrafo", texto_actual)
            if (nuevo_texto !== null && nuevo_texto !== "") actualizar_texto(bloque, nuevo_texto)
            break
        }
        case "slider":
        {
            // Obtener contenedor de imágenes
            const contenedor_imagenes = bloque.querySelector(".slider__imagenes")
            if (!contenedor_imagenes) break

            // Convertir a array para evitar problemas al eliminar hijos durante el loop
            const imagenes = Array.from(contenedor_imagenes.querySelectorAll(".slider__imagen"))

            // Recorrer Todas las Imágenes
            for (let i = 0; i < imagenes.length; i++)
            {
                const imagen = imagenes[i]

                // Pedir Ruta Nueva
                const ruta_vieja = imagen.src
                const ruta_nueva = prompt(`📄Edita la Ruta de la Imagen ${i + 1}\n-Vacio para Eliminar\n-0 para Salir`, ruta_vieja)

                // Salir si Ingresa 0, Eliminar si esta Vacio, sino Cambiar Ruta
                if (ruta_nueva == "0" || ruta_nueva == null) break
                else if (ruta_nueva == "")
                {
                    imagen.remove()
                    
                    // Si el contenedor no tiene mas imágenes, eliminar el slider
                    if (contenedor_imagenes.querySelectorAll(".slider__imagen").length === 0)
                    {
                        bloque.remove()
                        crear_placeholder_tarjeta()
                        recargar_sliders()
                        break
                    }
                }
                else
                {
                    imagen.src = ruta_nueva
                    imagen.onerror = function() {
                        imagen.src = obtener_ruta_aleatoria()
                        recargar_html()
                    }
                }
            }
            
            recargar_sliders()
            break
        }
        case "lista":
        {
            // Convertir a array para evitar problemas al eliminar hijos durante el loop
            const elementos = Array.from(bloque.getElementsByTagName("*"))

            // Recorrer Todos los Elementos
            for (let i = 0; i < elementos.length; i++)
            {
                const elemento = elementos[i];
                console.log(elemento)

                // Pedir Titulo
                if (elemento.tagName == "B")
                {
                    const texto_viejo_titulo = elemento.textContent
                    const texto_nuevo_titulo = prompt("📄Edita el Titulo de la Lista", texto_viejo_titulo)
                    elemento.textContent = texto_nuevo_titulo
                }

                // Editar Elementos
                if (elemento.tagName == "LI")
                {
                    // Pedir Texto Nuevo
                    const texto_viejo = elemento.textContent
                    const texto_nuevo = prompt(`📄Edita el Texto de la Lista\n-Vacio para Eliminar\n-0 para Salir`, texto_viejo)

                    // Salir si Ingresa 0, Eliminar si esta Vacio, sino Cambiar Texto
                    if (texto_nuevo == "0" || texto_nuevo == null) break
                    else if (texto_nuevo == "")
                    {
                        const ul_padre = elemento.closest("UL")
                        elemento.remove()
                        
                        // Si el UL no tiene mas LI, eliminarlo
                        if (ul_padre && ul_padre.querySelectorAll("LI").length === 0)
                        {
                            ul_padre.remove()
                            crear_placeholder_tarjeta()
                        }
                    }
                    else elemento.textContent = texto_nuevo
                }
            }
            break;
        }
        case "codigo":
        {
            const codigo = tarjeta_activa.querySelector(".codigo")
            const texto_actual = obtener_texto(codigo)
            const texto_nuevo = prompt("📄Edita el texto del Codigo", texto_actual)
            if (texto_nuevo !== null && texto_nuevo !== "") actualizar_texto(codigo, texto_nuevo)
            break
        }
        case "boton":
        {
            const boton = bloque.querySelector(".boton")

            // Botón Visitar
            if (boton.classList.contains("div__borde"))
            {
                const nueva_url = prompt("🔗Edita la URL de la Pagina", boton.href)
                if (nueva_url !== null && nueva_url !== "") boton.href = nueva_url
            }

            // Botón Descargar
            else if (boton.classList.contains("descargar"))
            {
                // Pedir URL y Editar URL
                const nueva_url = prompt("🔗Edita la URL de la Descarga", boton.href)
                if (nueva_url !== null && nueva_url !== "") boton.href = nueva_url

                // Pedir Texto y Editar Texto
                const texto_actual = obtener_texto(boton)
                const nuevo_texto = prompt("📄Edita el Texto del Boton", texto_actual)
                if (nuevo_texto !== null && nuevo_texto !== "") actualizar_texto(boton, nuevo_texto)
            }
            break
        }
    }
    recargar_html()
}












/* === Obtener Objeto Anterior al Reordenar ✅ === */
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

// Funcion Copiar al Portapapeles
function copiarPortapapeles(ruta)                           // Funcion que recibe 1 parametro
{
	let aux = document.createElement("textarea");           // Creo variable que guarda un "textarea"
	aux.value = document.getElementById(ruta).innerText;    // Agrego el valor que quiero copiar al "textarea"
	document.body.appendChild(aux);                         // Agrego el "textarea" al body
	aux.select();                                           // Selecciono lo que tiene el "textarea"
	document.execCommand("copy");                           // Ejecuto comando para copiar
	document.body.removeChild(aux);                         // Elimino "textarea" del body
    alert("Copiado al Portapales");                         // Muestro mensaje
}