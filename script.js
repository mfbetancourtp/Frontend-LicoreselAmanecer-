// 1. Datos de tus productos (puedes añadir más fácilmente aquí)
const productos = [
    {
        nombre: "Aguardiente Antioqueño",
        precio: "$45.000",
        imagen: "ruta/aguardiente.jpg" // Asegúrate de tener estas imágenes
    },
    {
        nombre: "Whisky Old Parr 12 Años",
        precio: "$180.000",
        imagen: "ruta/oldparr.jpg"
    },
    {
        nombre: "Ron Viejo de Caldas",
        precio: "$55.000",
        imagen: "ruta/ron.jpg"
    },
    {
        nombre: "Tequila José Cuervo",
        precio: "$95.000",
        imagen: "ruta/tequila.jpg"
    }
];

// 2. Función para renderizar los productos en el HTML
const contenedor = document.getElementById('contenedor-productos');

function cargarProductos() {
    productos.forEach(producto => {
        // Crear el elemento de la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-producto');

        // Insertar el contenido HTML de la tarjeta
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}</p>
            <button class="boton-carrito" onclick="hacerPedido('${producto.nombre}')">Pedir ahora</button>
        `;

        // Agregar al contenedor principal
        contenedor.appendChild(tarjeta);
    });
}

// 3. Función extra: Redirigir a WhatsApp con el nombre del producto
function hacerPedido(nombreProducto) {
    const mensaje = `Hola! Me gustaría pedir el producto: ${nombreProducto}`;
    const url = `https://wa.me/573188051459?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Ejecutar la carga al iniciar
document.addEventListener('DOMContentLoaded', cargarProductos);
