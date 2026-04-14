// ==========================================
// DATOS: Arreglo de productos
// ==========================================
const productos = [
    {
        nombre: "Aguardiente Antioqueño",
        precio: "$45.000",
        imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=300&auto=format&fit=crop"
    },
    {
        nombre: "Whisky Old Parr 12 Años",
        precio: "$180.000",
        imagen: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=300&auto=format&fit=crop"
    },
    {
        nombre: "Ron Viejo de Caldas",
        precio: "$55.000",
        imagen: "https://images.unsplash.com/photo-1614316059438-e6b772cda620?q=80&w=300&auto=format&fit=crop"
    },
    {
        nombre: "Tequila José Cuervo",
        precio: "$95.000",
        imagen: "https://images.unsplash.com/photo-1621217637890-09e867ac53ff?q=80&w=300&auto=format&fit=crop"
    }
];

// Función extra: Redirigir a WhatsApp
function hacerPedido(nombreProducto) {
    const mensaje = `Hola! Me gustaría pedir el producto: ${nombreProducto}`;
    const url = `https://wa.me/573188051459?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ==========================================
// INICIO DEL SCRIPT PRINCIPAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // EJERCICIOS 1: Evento Scroll y Estilo de Fondo en el Menú
    // -------------------------------------------------------------
    const header = document.querySelector('header');
    
    // ---> EVENTO 1: 'scroll'
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // ---> ESTILO 1: Cambiar 'backgroundColor'
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; 
        } else {
            header.style.backgroundColor = '#000';
        }
    });

    // -------------------------------------------------------------
    // CARGA DINÁMICA Y EJERCICIOS 2, 3 y 4 (Tarjetas y Botones)
    // -------------------------------------------------------------
    const contenedor = document.getElementById('contenedor-productos');

    // Renderizamos las tarjetas leyendo el array
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-producto');

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}</p>
            <button class="boton-carrito">Pedir ahora</button>
        `;

        // ---> EVENTO 2: 'mouseenter'
        tarjeta.addEventListener('mouseenter', () => {
            // ---> ESTILO 2: Cambiar 'boxShadow' (Brillo dorado)
            tarjeta.style.boxShadow = '0 0 20px #c8a166'; 
        });

        // ---> EVENTO 3: 'mouseleave'
        tarjeta.addEventListener('mouseleave', () => {
            // ---> ESTILO 3: Cambiar 'boxShadow' (Restaurar sombra oscura)
            tarjeta.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)'; 
        });

        // Seleccionamos el botón específico de esta tarjeta que acabamos de crear
        const botonCarrito = tarjeta.querySelector('.boton-carrito');
        
        // ---> EVENTO 4: 'click'
        botonCarrito.addEventListener('click', function() {
            // ---> ESTILO 4: Cambiar 'backgroundColor' y 'color'
            this.style.backgroundColor = '#25d366'; 
            this.style.color = '#ffffff';
            this.innerText = '¡Procesando...!';
            
            // Redirige a WhatsApp después de 1 segundo y restaura el botón
            setTimeout(() => {
                hacerPedido(producto.nombre);
                this.style.backgroundColor = '#c8a166';
                this.style.color = '#000000';
                this.innerText = 'Pedir ahora';
            }, 1000);
        });

        // Insertamos la tarjeta armada en el HTML
        contenedor.appendChild(tarjeta);
    });

    // -------------------------------------------------------------
    // EJERCICIOS 5: Evento Submit y Estilo de Borde en el Formulario
    // -------------------------------------------------------------
    const formulario = document.querySelector('.formulario');
    if (formulario) {
        
        // ---> EVENTO 5: 'submit'
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página recargue al enviar
            
            // ---> ESTILO 5: Cambiar 'border' y 'padding'
            formulario.style.border = '2px solid #25d366'; 
            formulario.style.padding = '30px';
            
            // Mostrar mensaje de éxito
            formulario.innerHTML = '<h3 style="color:#25d366; text-align:center; margin:0;">¡Mensaje enviado con éxito! Te contactaremos pronto.</h3>';
        });
    }

});