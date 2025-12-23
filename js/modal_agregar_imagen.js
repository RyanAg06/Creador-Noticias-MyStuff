
const modal_agregar_imagen = document.getElementById('modal_subir_imagen');
const btn_agregar_imagen = document.getElementById('btn_agregar_imagen');
const previsualizacion_imagen = document.getElementById('previsualizacion_imagen');
const input_imagen = document.getElementById('input_imagen');
const input_texto_etiqueta = document.getElementById('input_texto_etiqueta');


input_imagen.addEventListener('change', () => {
    const file = input_imagen.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previsualizacion_imagen.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


export function abrir_modal(){
    modal_agregar_imagen.style.zIndex = 100;
}

export function cerrar_modal(){
    limpiar_modal();
    modal_agregar_imagen.style.zIndex = -1;
}

export function limpiar_modal(){
    previsualizacion_imagen.src = "";
    input_imagen.value = "";
    input_texto_etiqueta.value = "";
}