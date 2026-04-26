import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwo61druUZwKyvJPCZlWjm19QZwiE0IK0",
  authDomain: "licores-amanecer.firebaseapp.com",
  projectId: "licores-amanecer",
  storageBucket: "licores-amanecer.firebasestorage.app",
  messagingSenderId: "204066608534",
  appId: "1:204066608534:web:efe3b937941d32a5f439b7",
  measurementId: "G-SXR0DP1CZS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- CARGAR PRODUCTOS (Detección de página) ---
async function cargarProductos() {
    const gridCliente = document.getElementById('contenedor-productos-cliente');
    const gridAdmin = document.getElementById('contenedor-productos-admin');
    
    try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        if (gridCliente) gridCliente.innerHTML = '';
        if (gridAdmin) gridAdmin.innerHTML = '';

        querySnapshot.forEach((documento) => {
            const data = documento.data();
            const id = documento.id;
            const img = data.imagen || `https://ui-avatars.com/api/?name=${data.nombre}&background=121212&color=D4AF37&size=512`;

            if (gridCliente) {
                const card = document.createElement('div');
                card.className = 'tarjeta-producto';
                card.innerHTML = `<div class="imagen-contenedor"><img src="${img}" class="imagen-producto" onerror="this.src='https://images.unsplash.com/photo-1569158062037-d24600c2c748?auto=format&fit=crop&w=800&q=80'"></div>
                    <div class="info-producto"><h3>${data.nombre}</h3><p class="precio">$${data.precio.toLocaleString()}</p></div>
                    <button id="p-${id}" style="width:90%; margin: 0 5% 20px; padding:15px; background:var(--oro); border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SOLICITAR PEDIDO</button>`;
                gridCliente.appendChild(card);
                document.getElementById(`p-${id}`).onclick = () => {
                    document.getElementById('modal-pedido').style.display = 'flex';
                    document.getElementById('pedido-producto').value = data.nombre;
                    document.getElementById('pedido-precio').value = data.precio;
                    document.getElementById('detalle-pedido-texto').innerHTML = `Producto: <strong>${data.nombre}</strong><br>Precio: <strong>$${data.precio.toLocaleString()}</strong>`;
                };
            }

            if (gridAdmin) {
                const card = document.createElement('div');
                card.className = 'tarjeta-producto';
                card.innerHTML = `<div class="imagen-contenedor"><img src="${img}" class="imagen-producto"></div>
                    <div class="info-producto"><h3>${data.nombre}</h3><p class="precio">$${data.precio.toLocaleString()}</p></div>
                    <div class="btn-group"><button class="btn-edit" id="ed-${id}">Editar</button><button class="btn-delete" id="de-${id}">Borrar</button></div>`;
                gridAdmin.appendChild(card);
                document.getElementById(`de-${id}`).onclick = async () => { if(confirm("¿Eliminar?")) { await deleteDoc(doc(db,"productos",id)); cargarProductos(); } };
                document.getElementById(`ed-${id}`).onclick = () => {
                    document.getElementById('producto-id').value = id;
                    document.getElementById('producto-nombre').value = data.nombre;
                    document.getElementById('producto-precio').value = data.precio;
                    document.getElementById('producto-imagen').value = data.imagen || "";
                    window.scrollTo({top:0, behavior:'smooth'});
                };
            }
        });
    } catch (e) { console.error(e); }
}

// --- CRUD PRODUCTOS (ADMIN) ---
const formProd = document.getElementById('form-producto');
if (formProd) {
    formProd.onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('producto-id').value;
        const nombre = document.getElementById('producto-nombre').value;
        const precio = Number(document.getElementById('producto-precio').value);
        const imagen = document.getElementById('producto-imagen').value;
        if (id === "") await addDoc(collection(db, "productos"), { nombre, precio, imagen });
        else await updateDoc(doc(db, "productos", id), { nombre, precio, imagen });
        formProd.reset(); document.getElementById('producto-id').value = ""; cargarProductos();
    };
}

// --- GESTIÓN DE PEDIDOS ---
const formPedido = document.getElementById('form-pedido');
if (formPedido) {
    formPedido.onsubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "pedidos"), {
            producto: document.getElementById('pedido-producto').value,
            precio: Number(document.getElementById('pedido-precio').value),
            nombre: document.getElementById('pedido-nombre').value,
            telefono: document.getElementById('pedido-telefono').value,
            direccion: document.getElementById('pedido-direccion').value,
            fecha: new Date()
        });
        document.getElementById('modal-pedido').style.display = 'none';
        alert("¡Pedido enviado!"); formPedido.reset();
    };
    document.getElementById('btn-cerrar-modal').onclick = () => document.getElementById('modal-pedido').style.display = 'none';
}

// --- BANDEJA DE ENTRADA (ADMIN) ---
async function cargarDatosAdmin() {
    const contPedidos = document.getElementById('contenedor-pedidos');
    const contMensajes = document.getElementById('contenedor-mensajes');
    if (!contPedidos) return;

    const snapP = await getDocs(collection(db, "pedidos"));
    contPedidos.innerHTML = '';
    snapP.forEach(doc => {
        const p = doc.data();
        const div = document.createElement('div');
        div.style = "background:#121212; padding:20px; border-radius:12px; border-left:4px solid #25d366;";
        div.innerHTML = `<h4 style="margin:0; color:#25d366;">📦 ${p.producto}</h4><p style="margin:5px 0;">Cliente: ${p.nombre}<br>Tel: ${p.telefono}<br>Dir: ${p.direccion}</p><strong style="color:var(--oro);">$${p.precio.toLocaleString()}</strong>`;
        contPedidos.appendChild(div);
    });

    const snapM = await getDocs(collection(db, "mensajes"));
    contMensajes.innerHTML = '';
    snapM.forEach(doc => {
        const m = doc.data();
        const div = document.createElement('div');
        div.style = "background:#121212; padding:20px; border-radius:12px; border-left:4px solid var(--oro);";
        div.innerHTML = `<h4 style="margin:0; color:var(--oro);">👤 ${m.nombre}</h4><p style="margin:5px 0; font-size:0.9rem; color:#888;">${m.email}</p><p style="font-style:italic;">"${m.mensaje}"</p>`;
        contMensajes.appendChild(div);
    });
}

// --- MENSAJES (CLIENTE) ---
const formMsg = document.getElementById('contact-form');
if (formMsg) {
    formMsg.onsubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "mensajes"), {
            nombre: document.getElementById('input-nombre').value,
            email: document.getElementById('input-email').value,
            mensaje: document.getElementById('input-mensaje').value,
            fecha: new Date()
        });
        formMsg.style.display = 'none'; document.getElementById('mensaje-exito').style.display = 'block';
    };
}

document.addEventListener('DOMContentLoaded', () => { cargarProductos(); cargarDatosAdmin(); });