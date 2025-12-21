# Análisis de Optimización - editor.js

## 📊 Resumen de Problemas Identificados

### Problemas Críticos de Rendimiento

1. **`recargar_html()` se llama 33 veces** - Esta función clona todo el DOM del canvas, lo cual es muy costoso
2. **95+ consultas `querySelector/querySelectorAll`** - Muchas consultas DOM repetidas sin caché
3. **Falta de debouncing/throttling** - Eventos `dragover` se disparan cientos de veces sin optimización
4. **Consultas DOM dentro de loops** - Múltiples consultas repetidas en iteraciones
5. **Código duplicado** - Repetición de lógica para crear contenedores de información

---

## 🔧 Optimizaciones Recomendadas

### 1. **Caché de Elementos DOM Frecuentemente Usados**

**Problema**: Se consultan los mismos elementos múltiples veces.

**Solución**: Crear un objeto de caché al inicio del script:

```javascript
// Al inicio del archivo, después de las constantes iniciales
const DOMCache = {
    contenedor_titulos: null,
    titulo_pagina: null,
    subtitulo_pagina: null,
    preview_tarjetas: null,
    titulos_preview: null,
    titulo_preview: null,
    subtitulo_preview: null,
    
    // Inicializar una vez
    init() {
        this.contenedor_titulos = document.querySelector(".titulos_superiores");
        this.titulo_pagina = this.contenedor_titulos?.querySelector(".titulo_pagina");
        this.subtitulo_pagina = this.contenedor_titulos?.querySelector(".subtitulo_pagina");
        this.preview_tarjetas = document.querySelector(".tarjetas");
        const titulos = panel_html_generado?.querySelector(".titulos");
        this.titulos_preview = titulos;
        this.titulo_preview = titulos?.querySelector(".titulos__titulo");
        this.subtitulo_preview = titulos?.querySelector(".titulos__subtitulo");
    }
};

// Inicializar después de que el DOM esté listo
DOMCache.init();
```

**Beneficio**: Reduce ~20-30 consultas DOM por llamada a `recargar_html()`.

---

### 2. **Optimizar `recargar_html()` con Caché y Batch Updates**

**Problema**: La función clona todo el DOM y se llama 33 veces.

**Solución**:

```javascript
let recargar_html_pendiente = false;

function recargar_html() {
    // Si ya hay una recarga pendiente, no hacer nada
    if (recargar_html_pendiente) return;
    
    recargar_html_pendiente = true;
    
    // Usar requestAnimationFrame para agrupar actualizaciones
    requestAnimationFrame(() => {
        const copia_canva = canva.cloneNode(true);
        
        // Usar caché en lugar de consultas repetidas
        const texto_titulo_pagina = DOMCache.titulo_pagina?.textContent || "";
        const texto_subtitulo_pagina = DOMCache.subtitulo_pagina?.textContent || "";
        
        // Centrar Títulos
        if (DOMCache.contenedor_titulos?.classList.contains("centrados")) {
            DOMCache.titulos_preview?.classList.add("centro");
        } else {
            DOMCache.titulos_preview?.classList.remove("centro");
        }
        
        // Cargar Títulos
        if (DOMCache.titulo_preview) DOMCache.titulo_preview.textContent = texto_titulo_pagina;
        if (DOMCache.subtitulo_preview) DOMCache.subtitulo_preview.textContent = texto_subtitulo_pagina;
        
        // Cambiar Modo Tarjetas
        if (canva.classList.contains("vertical")) {
            DOMCache.preview_tarjetas?.classList.add("vertical");
        } else {
            DOMCache.preview_tarjetas?.classList.remove("vertical");
        }
        
        // Cargar Tarjetas
        limpiar_elementos(copia_canva);
        if (DOMCache.preview_tarjetas) {
            DOMCache.preview_tarjetas.innerHTML = copia_canva.innerHTML;
        }
        
        recargar_html_pendiente = false;
    });
}
```

**Beneficio**: Reduce llamadas redundantes y agrupa actualizaciones del DOM.

---

### 3. **Throttling en Eventos `dragover`**

**Problema**: `dragover` se dispara cientos de veces por segundo.

**Solución**:

```javascript
// Función throttle genérica
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Aplicar a eventos dragover
tarjeta.addEventListener("dragover", throttle((e) => {
    e.stopPropagation();
    e.preventDefault();
    // ... resto del código
}, 16)); // ~60fps
```

**Beneficio**: Reduce ejecuciones de ~200-300 por segundo a ~60 por segundo.

---

### 4. **Eliminar Consultas DOM Dentro de Loops**

**Problema**: En `agregar_elementos()`, se consulta `tarjeta_activa.querySelector(".tarjeta__informacion")` múltiples veces.

**Solución**: Cachear antes del switch:

```javascript
function agregar_elementos() {
    if (tarjeta_activa.classList.contains("reordenando")) return;
    
    // Cachear contenedor una sola vez
    let contenedor_informacion = tarjeta_activa.querySelector(".tarjeta__informacion");
    const necesita_contenedor = !contenedor_informacion;
    
    if (necesita_contenedor) {
        contenedor_informacion = document.createElement("div");
        contenedor_informacion.classList.add("tarjeta__informacion");
    }
    
    switch (tipo_elemento) {
        case "titulo":
        case "minititulo":
        case "subtitulo":
        case "parrafo":
        case "slider":
        case "lista":
        case "codigo":
        case "boton_visitar":
        case "boton_descargar":
            // Todos estos casos pueden usar el contenedor cacheado
            if (necesita_contenedor) {
                tarjeta_activa.appendChild(contenedor_informacion);
            }
            // ... resto del código específico
            break;
    }
}
```

**Beneficio**: Reduce consultas DOM en ~50-70% dentro de esta función.

---

### 5. **Usar `classList.contains()` en lugar de `getAttribute("class")`**

**Problema**: Línea 16 usa `getAttribute("class") == "show"` que es menos eficiente.

**Solución**:

```javascript
// Antes:
btn_previsualizar_html.textContent = (panel_html_generado.getAttribute("class") == "show") 
    ? "🚫Ocultar Previsualizacion" 
    : "👁️Ver Previsualizacion"

// Después:
btn_previsualizar_html.textContent = panel_html_generado.classList.contains("show")
    ? "🚫Ocultar Previsualizacion" 
    : "👁️Ver Previsualizacion"
```

**Beneficio**: Más eficiente y maneja múltiples clases correctamente.

---

### 6. **Optimizar `obtener_anterior()` con Caché de getBoundingClientRect**

**Problema**: `getBoundingClientRect()` se llama múltiples veces en cada `dragover`.

**Solución**:

```javascript
function obtener_anterior(container, y, clase) {
    const elementos = container.querySelectorAll(clase);
    let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
    
    // Cachear getBoundingClientRect para todos los elementos
    const rects = Array.from(elementos).map(el => ({
        element: el,
        rect: el.getBoundingClientRect()
    }));
    
    return rects.reduce((closest, { element, rect }) => {
        const offset = y - rect.top - rect.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element };
        }
        return closest;
    }, closest).element;
}
```

**Beneficio**: Reduce llamadas costosas a `getBoundingClientRect()`.

---

### 7. **Memoizar `obtener_ruta_aleatoria()`**

**Problema**: Se crea el array de rutas cada vez que se llama.

**Solución**:

```javascript
const RUTAS_IMAGEN_DEFECTO = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fm%2FwCrZqAL1cWMAAAAC%2Fspinning-fish.gif&f=1&nofb=1&ipt=435d6d8ca1000bf77f32d403bde4060bcdff4d45f39711291be9406f810f233c",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia4.giphy.com%2Fmedia%2Fv1.Y2lkPTc5MGI3NjExejYwN3MxYTRjZm5ubHk1c2s0enluODAzMTUyOGZqa2tseHZtOXh0cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n%2FCPlkqEvq8gRDW%2F200.gif&f=1&nofb=1&ipt=a02f287e44c68175a1c190d48ac71d57f87356bfaf93fe3ac7d7ea7fcd9c2c82",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2Fue7Q8JmP_0MAAAAM%2Foiia-oiiaoiia.gif&f=1&nofb=1&ipt=ced626dca28341f0b94dd1fb4f5bbac234ae22b9641c7f55e3cb037a6a94717c",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.FYRMiETGyJyo7rh68knMHQHaHa%3Fpid%3DApi&f=1&ipt=935961266a57c630253c3dde398f21e1232671985a27a55b0b043f7f01f546d4&ipo=images"
];

function obtener_ruta_aleatoria() {
    return RUTAS_IMAGEN_DEFECTO[Math.floor(Math.random() * RUTAS_IMAGEN_DEFECTO.length)];
}
```

**Beneficio**: Evita crear arrays en cada llamada.

---

### 8. **Reducir Llamadas Múltiples a `recargar_html()`**

**Problema**: Algunas funciones llaman `recargar_html()` múltiples veces.

**Solución**: Agrupar actualizaciones:

```javascript
// En lugar de:
function alguna_funcion() {
    // ... código ...
    recargar_html();
    // ... más código ...
    recargar_html();
    // ... más código ...
    recargar_html();
}

// Hacer:
function alguna_funcion() {
    // ... código ...
    // ... más código ...
    // ... más código ...
    recargar_html(); // Solo una vez al final
}
```

**Beneficio**: Reduce llamadas redundantes en ~40-50%.

---

### 9. **Optimizar `identificar_bloques()`**

**Problema**: Múltiples consultas `querySelectorAll` en un loop.

**Solución**:

```javascript
function identificar_bloques(contenedor) {
    // Usar un selector combinado en lugar de múltiples consultas
    const selector = '.tarjeta__titulo, .tarjeta__fecha, .tarjeta__subtitulo, .tarjeta__descripcion, .tarjeta__lista, .tarjeta__codigo, .slider, .div__boton';
    const elementos = contenedor.querySelectorAll(selector);
    
    return Array.from(elementos).filter(elemento => {
        // Verificar que el elemento esté directamente en tarjeta__informacion
        const parent = elemento.parentElement;
        return parent === contenedor || parent.classList.contains('tarjeta__informacion');
    });
}
```

**Beneficio**: Una sola consulta DOM en lugar de 8.

---

### 10. **Usar `DocumentFragment` para Múltiples Inserciones**

**Problema**: Múltiples `appendChild` causan reflows.

**Solución**:

```javascript
// En funciones que agregan múltiples elementos
const fragment = document.createDocumentFragment();
elementos.forEach(elemento => {
    const li = document.createElement("li");
    li.textContent = elemento;
    fragment.appendChild(li);
});
bloque.appendChild(fragment); // Un solo reflow
```

**Beneficio**: Reduce reflows del navegador.

---

## 📈 Impacto Esperado

### Mejoras de Rendimiento Estimadas:

- **Reducción de consultas DOM**: ~60-70%
- **Reducción de llamadas a `recargar_html()`**: ~40-50%
- **Mejora en eventos drag**: ~75% menos ejecuciones
- **Tiempo total de ejecución**: ~50-60% más rápido
- **Uso de memoria**: ~20-30% menos (menos clonaciones)

---

## 🎯 Prioridad de Implementación

1. **Alta Prioridad**:
   - Caché de elementos DOM (Optimización #1)
   - Throttling en dragover (Optimización #3)
   - Batch updates en recargar_html (Optimización #2)

2. **Media Prioridad**:
   - Eliminar consultas DOM en loops (Optimización #4)
   - Optimizar obtener_anterior (Optimización #6)
   - Reducir llamadas múltiples (Optimización #8)

3. **Baja Prioridad**:
   - Memoizar obtener_ruta_aleatoria (Optimización #7)
   - Usar DocumentFragment (Optimización #10)
   - Optimizar identificar_bloques (Optimización #9)

---

## ⚠️ Notas Importantes

- Las optimizaciones deben probarse individualmente
- Algunas optimizaciones pueden requerir ajustes en otros archivos
- Mantener la funcionalidad existente es crítico
- Considerar usar herramientas de profiling (Chrome DevTools) para medir mejoras reales

