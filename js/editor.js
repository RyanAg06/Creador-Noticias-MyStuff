
/* === Mostrar/Ocultar HTML Generado === */
// Variables
const btn_previsualizar_html = document.querySelector("#previsualizar_html")
const panel_html_generado = document.querySelector("#panel_html_generado")
let tarjeta_activa = ""

btn_previsualizar_html.addEventListener("click", () =>
{
    panel_html_generado.classList.toggle("show")
    btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") ? "Ocultar HTML" : "Previsualizar HTML"
})

/* === Crear Tarjeta === */
const btn_agregar_tarjeta = document.querySelector("#agregar_tarjeta")
const canva = document.getElementById("canvas")
btn_agregar_tarjeta.addEventListener("click", () =>
{
    // Desactivar Tarjetas Anteriores
    const tarjetas_viejas = document.querySelectorAll(".tarjeta")
    if (!tarjetas_viejas.length == 0)
    {
        tarjetas_viejas.forEach(tarjeta_recorrida =>
        {
            tarjeta_recorrida.classList.remove("activa")
            tarjeta_recorrida.querySelectorAll("[draggable]").forEach(bloque => { bloque.setAttribute("draggable", "false") })
        })
    }

    // Crear Tarjeta Nueva y Activarla
    const tarjeta_nueva = document.createElement("div")
    tarjeta_nueva.classList.add("tarjeta", "activa")
    tarjeta_nueva.addEventListener("click", () =>
    {
        // Desactivar Tarjetas
        const tarjetas = document.querySelectorAll(".tarjeta")
        tarjetas.forEach(tarjeta_recorrida =>
        {
            tarjeta_recorrida.classList.remove("activa") // Desactivar Tarjeta
            tarjeta_recorrida.querySelectorAll("[draggable]").forEach(bloque => { bloque.setAttribute("draggable", "false") }) // Desactivar Drag en Bloques
        })

        // Activar Tarjeta si dio Click
        tarjeta_nueva.classList.toggle("activa")
        tarjeta_activa = tarjeta_nueva
        tarjeta_activa.querySelectorAll(".bloque").forEach(bloque => { bloque.setAttribute("draggable", "true") }) // Activar Drag en Bloques
        comportamiento_drag_drop() // Agregar Comportamiento Drag and Drop Interno
    })

    // Agregar Placeholder Tarjeta
    const placeholder_tarjeta = document.createElement("p")
    placeholder_tarjeta.classList.add("placeholder_tarjeta")
    placeholder_tarjeta.textContent = "Suelta los Elementos Aqui Dentro..."
    tarjeta_nueva.appendChild(placeholder_tarjeta)

    // Agregar Tarjeta al Canva
    canva.appendChild(tarjeta_nueva)

    // Eliminar Placeholder Despues de Agregar una Tarjeta
    const placeholder_canva = canva.querySelector(".placeholder_canva")
    if (placeholder_canva) placeholder_canva.remove()
})

/* === Sistema de Drag and Drop === */
// Variables
let items = document.querySelectorAll(".item")
let id = null

// Arrastrar Elemento del Panel
items.forEach(item => { item.addEventListener("dragstart", () => { id = item.getAttribute("id") }) }) // Obtener ID

function comportamiento_drag_drop()
{
    // Detectar Cuando esta ENCIMA de la Tarjeta Activa
    tarjeta_activa.addEventListener("dragover", e =>
    {
        e.preventDefault();
        const bloque_activo = document.querySelector(".block_dragging");
        if (!bloque_activo) return;
    
        const posicion_nueva = calcular_reordenamiento(tarjeta_activa, e.clientY);
        if (posicion_nueva == null) tarjeta_activa.appendChild(bloque_activo)
        else tarjeta_activa.insertBefore(bloque_activo, posicion_nueva);
    });
    
    // Soltar Elemento en Tarjeta Activa
    tarjeta_activa.addEventListener("drop",() =>
    {
        // e.preventDefault()
        if (!id) return
    
        switch(id) // Crear Blouque de HTML
        {
            case "imagen_tarjeta":
            {
                const contenedor_imagen = document.createElement("div")
                contenedor_imagen.classList.add("tarjeta__imagenes", "bloque")
    
                const imagen = document.createElement("img")
                imagen.alt = "Imagen"
    
                let url = ""
                do
                {
                    url = prompt("Ingresa la URL de la Imagen")
                    if (url == null) return
                }
                while(url.trim() == "")
    
                imagen.src = url
                contenedor_imagen.appendChild(imagen)
    
                // Etiqueta (Opcional)
                let texto_etiqueta = prompt("Ingrese una Etiqueta, Vacio para Omitir")
                if (texto_etiqueta.trim() != "")
                {
                    const contenedor_etiqueta = document.createElement("div")
                    contenedor_etiqueta.classList.add("etiqueta")
    
                    const etiqueta = document.createElement("p")
                    etiqueta.classList.add("etiqueta__titulo")
                    etiqueta.textContent = texto_etiqueta
    
                    contenedor_etiqueta.appendChild(etiqueta)
                    contenedor_imagen.appendChild(contenedor_etiqueta)
                }
    
                tarjeta_activa.appendChild(contenedor_imagen)
                break
            }
    
            case "titulo_tarjeta":
            {
                const contenedor_titulo = document.createElement("div");
                contenedor_titulo.classList.add("bloque");
    
                const titulo = document.createElement("p");
                titulo.textContent = prompt("Ingresa el Título") || "";
    
                contenedor_titulo.appendChild(titulo);
                tarjeta_activa.appendChild(contenedor_titulo);
                break;
            }
    
            default:return
        }
    
        id = null // Resetear ID

        // Eliminar Placeholder Tarjeta
        const placeholder_tarjeta = tarjeta_activa.querySelector(".placeholder_tarjeta")
        if (placeholder_tarjeta) placeholder_tarjeta.remove()
        
        // Reordenar Bloques
        let bloques = document.querySelectorAll(".bloque")
        bloques.forEach(bloque =>
        {
            bloque.setAttribute("draggable", "true") // Hacer Arrastrables los Bloques
            bloque.addEventListener("dragstart", () => { bloque.classList.add("block_dragging") }) // Agregar Clase
            bloque.addEventListener("dragend", () => { bloque.classList.remove("block_dragging") }) // Eliminar Clase
        })
    })
}

// Calcular Posición Para Reordenar Bloque Mientras Arrastras
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
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        // Si el offset es negativo (el mouse está por encima del centro del elemento)
        // y es el que más se acerca a 0, actualizamos el "closest".
        if (offset < 0 && offset > closest.offset) 
            return { offset: offset, element: child }
        else 
            return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
