const productos = [
    {
        id: 1,
        nombre: "HOODIE BOXIFIT WHITE DICE V2",
        precio: 39990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice1.png?v=1753404231&width=1426",
        imagenHover: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice2.png?v=1753404231&width=1426",
        descripcion: "POLERÓN BOXIFIT AZUL MARINO 'WHITE DICE'.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro", "Blanco", "Gris"],
        destacado: true
    },
    {
        id: 2,
        nombre: "Star Player 'Blue Team't-shirt",
        precio: 21990,
        categoria: "polera",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/1_594f01e1-55e5-4516-b0af-d2befc1aa113.png?v=1748653006&width=1100",
        imagenHover: "https://stuffiesconcept.com/cdn/shop/files/2_221c9cfc-6049-4eb1-b7ec-3b19bd755c48.png?v=1748653006&width=600",
        descripcion: "La Star Player T-Shirt nace de la unión entre la nostalgia del fútbol clásico y la energía del streetwear actual.",
        tallas: ["M", "L", "XL"],
        colores: ["Gris", "Negro"],
        destacado: true
    },
    {
        id: 3,
        nombre: "Stella Chroma Zip Hoodie",
        precio: 45990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/1_8ee3f1b2-2f8a-45ba-bb78-a2f4ba49c4d5.png?v=1756936574&width=600",
        imagenHover:"https://stuffiesconcept.com/cdn/shop/files/2_1c0d6df0-c713-49a3-b2bd-b07d19c392ee.png?v=1756936574&width=600",
        descripcion: "Logos y diseños implementados con serigrafía y bordado para una mayor calidad y durabilidad.",
        tallas: ["28", "30", "32", "34", "36"],
        colores: ["Azul oscuro", "Azul claro", "Negro"],
        destacado: true
    },
    {
        id: 4,
        nombre: "Stella Boxy-Slim White Tee",
        precio: 22990,
        categoria: "poleras",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/3_0f38dc89-f9f8-4998-be22-b2e0122e8816.png?v=1756936601&width=600",
        imagenHover:"https://stuffiesconcept.com/cdn/shop/files/4_8a500939-3d78-4b9c-aaab-fc34db0d117d.png?v=1756936601&width=600",
        descripcion: "Polera con estampado minimalista en la pecho.",
        tallas: ["S", "M", "L"],
        colores: ["Blanco", "Negro"],
        destacado: true
    },
    {
        id: 5,
        nombre: "HOODIE BOXIFIT RED DICE V2",
        precio: 39990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/RedDice1.png?v=1753404319&width=600",
        imagenHover:"https://stuffiesconcept.com/cdn/shop/files/RedDice2.png?v=1753404319&width=600",
        descripcion: "Shorts deportivos con tecnología de secado rápido.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro", "Gris", "Azul"],
        destacado: false
    },
    {
        id: 6,
        nombre: "Star Player 'Black Team 't-shirt",
        precio: 21990,
        categoria: "accesorios",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/3_f5bf3ad8-c122-436f-8eee-1483a3f383da.png?v=1748652948&width=600",
        imagenHover:"https://stuffiesconcept.com/cdn/shop/files/4_b9bc3afc-97e9-4636-94f4-1a863738d755.png?v=1748652948&width=600",
        descripcion: "Gorra ajustable con logo bordado de Stuffies.",
        tallas: ["Única"],
        colores: ["Negro", "Blanco", "Rojo"],
        destacado: false
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    if (document.getElementById('featured-products')) {
        cargarProductosDestacados();
    }
    
    if (document.getElementById('todos-productos')) {
        cargarTodosLosProductos();
        configurarFiltros();
    }
    
    if (document.getElementById('detalle-producto')) {
        cargarDetalleProducto();
    }
    
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', manejarSuscripcion);
    }
    
    actualizarContadorCarrito();
    configurarNavegacionMovil();
});

function cargarProductosDestacados() {
    const contenedor = document.getElementById('featured-products');
    if (!contenedor) return;
    
    const productosDestacados = productos.filter(p => p.destacado);
    if (productosDestacados.length === 0) {
        contenedor.innerHTML = '<p class="empty-message">No hay productos destacados en este momento.</p>';
        return;
    }
    
    const productosMostrar = productosDestacados.slice(0, 4);
    
    contenedor.innerHTML = productosMostrar.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-main"
                     onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
                <img src="${producto.imagenHover || producto.imagen}" alt="${producto.nombre}" class="img-hover">
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
                <div class="product-actions">
                    <a href="detalle-producto.html?id=${producto.id}" class="btn btn-outline">Ver detalles</a>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cargar todos los productos
function cargarTodosLosProductos() {
    const contenedor = document.getElementById('todos-productos');
    if (!contenedor) return;

    contenedor.innerHTML = productos.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-main"
                     onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
                <img src="${producto.imagenHover || producto.imagen}" alt="${producto.nombre}" class="img-hover">
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
                <div class="product-actions">
                    <a href="detalle-producto.html?id=${producto.id}" class="btn btn-outline">Ver detalles</a>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir</button>
                </div>
            </div>
        </div>
    `).join('');
}

