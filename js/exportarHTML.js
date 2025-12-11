
/* === Exportar HTML en Archivo ✅ === */
const btn_descargar_html = document.querySelector("#descargar_html")
btn_descargar_html.addEventListener("click", e =>
{
    e.stopPropagation()
    exportar_HTML()
})
function exportar_HTML()
{
    const canva = document.querySelector("#canva")
    let copia_canva = canva.cloneNode(true)

    const contenedor_titulos = document.querySelector(".titulos_superiores")
    const texto_titulo_pagina = document.querySelector(".titulo_pagina").textContent
    const texto_subtitulo_pagina = document.querySelector(".subtitulo_pagina").textContent

    // Limpiar Elementos no Deseados
    limpiar_elementos(copia_canva)
    
    // Obtener el HTML Nuevo
    const cleanHTML = copia_canva.innerHTML
    
    // Crear HTML Final
    const htmlContent = `<!DOCTYPE html>
    <html lang="es">
        <head>
            <title>MyStuff</title>
            <meta charset="UTF-8">
            <link rel="icon" href="./imagenes/bola.png">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
            <link rel="stylesheet" href="./css/estilos.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.umd.js"></script>
        </head>
        <body>
            <div class="scroll-h"></div>
            <script src="./js/header.js"></script>
            <main>
                <div class="titulos ${(contenedor_titulos.classList.contains("centrados")) ? "centro" : ""}">
                    <p class="titulos__titulo">${texto_titulo_pagina}</p>
                    <p class="titulos__subtitulo">${texto_subtitulo_pagina}</p>
                </div>
                <article class="tarjetas ${(canva.classList.contains("vertical") ? "vertical" : "")}">
                    ${cleanHTML}
                </article>
                <a href="#" class="boton-subir"><ion-icon name="arrow-up-outline"></ion-icon></a>
            </main>
            <script src="./js/footer.js"></script>
        </body>
    </html>`;
    
    // Exportar Archivo
    downloadHTMLFile(htmlContent, 'seccion.html');
}
function downloadHTMLFile(content, filename)
{
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function limpiar_elementos(canva)
{
    // Elementos a Eliminar
    const elementosEliminar = [
        '.placeholder_canva',
        '.placeholder_tarjeta',
        '.btn_eliminar_bloque',
        '.btn_editar_bloque',
        '.placeholder_tarjeta',
        '.btn_eliminar_tarjeta',
        '.btn_editar_imagen',
        '.btn_eliminar_imagen',
        '.btn_agregar_elementos'
    ].join(', ')
    
    // Clases a Eliminar
    const clasesEliminar = ['.activa','.bloque']

    // Eliminar Elementos
    canva.querySelectorAll(elementosEliminar).forEach(elemento => elemento.remove())

    // Eliminar Atributo Draggable
    canva.querySelectorAll("[draggable]").forEach(elemento => elemento.removeAttribute("draggable"))

    // Eliminar Clases
    clasesEliminar.forEach(claseEliminar => canva.querySelectorAll(claseEliminar).forEach(elemento => elemento.classList.remove(claseEliminar)))
}