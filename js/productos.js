// Datos de productos (simulando una base de datos)
const productos = [
    {
        id: 1,
        nombre: "Polera Oversize Negra",
        precio: 19990,
        categoria: "poleras",
        imagen: "assets/imagenes/polera-negra.jpg",
        descripcion: "Polera oversize de algodón 100% con estampado frontal.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro", "Blanco", "Gris"]
    },
    {
        id: 2,
        nombre: "Polerón Boxy Fit Gris",
        precio: 39990,
        categoria: "polerones",
        imagen: "assets/imagenes/poleron-gris.jpg",
        descripcion: "Polerón con capucha y bolsillo canguro, corte boxy fit.",
        tallas: ["M", "L", "XL"],
        colores: ["Gris", "Negro"]
    },
    {
        id: 3,
        nombre: "Jeans Slim Fit",
        precio: 45990,
        categoria: "jeans",
        imagen: "assets/imagenes/jeans-slim.jpg",
        descripcion: "Jeans slim fit de tiro medio con stretch para mayor comodidad.",
        tallas: ["28", "30", "32", "34", "36"],
        colores: ["Azul oscuro", "Azul claro", "Negro"]
    },
    {
        id: 4,
        nombre: "Polera Estampada",
        precio: 22990,
        categoria: "poleras",
        imagen: "assets/imagenes/polera-estampada.jpg",
        descripcion: "Polera con estampado artístico en la espalda y detalles en mangas.",
        tallas: ["S", "M", "L"],
        colores: ["Blanco", "Negro"]
    }
];

// Cargar productos destacados en la página principal
function cargarProductosDestacados() {
    const contenedor = document.getElementById('featured-products');
    if (!contenedor) return;
    
    // Limitar a 4 productos destacados
    const productosDestacados = productos.slice(0, 4);
    
    contenedor.innerHTML = productosDestacados.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
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

// Cargar todos los productos en la página de productos
function cargarTodosLosProductos() {
    const contenedor = document.getElementById('todos-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = productos.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
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

// Cargar detalles de un producto específico
function cargarDetalleProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'productos.html';
        return;
    }
    
    const producto = productos.find(p => p.id === productId);
    if (!producto) {
        window.location.href = 'productos.html';
        return;
    }
    
    const contenedor = document.getElementById('detalle-producto');
    if (!contenedor) return;
    
    contenedor.innerHTML = `
        <div class="product-detail-image">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="product-detail-info">
            <h1>${producto.nombre}</h1>
            <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
            <p class="product-description">${producto.descripcion}</p>
            
            <div class="product-options">
                <div class="form-group">
                    <label for="talla">Talla:</label>
                    <select id="talla" name="talla">
                        ${producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="color">Color:</label>
                    <select id="color" name="color">
                        ${producto.colores.map(color => `<option value="${color}">${color}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" name="cantidad" value="1" min="1">
                </div>
            </div>
            
            <button class="btn btn-primary btn-large" onclick="agregarAlCarritoDetalle(${producto.id})">Añadir al carrito</button>
        </div>
    `;
}

// Agregar producto al carrito desde la página de productos
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.productoId === productoId && item.talla === "M" && item.color === producto.colores[0]);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            productoId: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: "M",
            color: producto.colores[0],
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${producto.nombre} añadido al carrito!`);
}

// Agregar producto al carrito desde la página de detalle
function agregarAlCarritoDetalle(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const talla = document.getElementById('talla').value;
    const color = document.getElementById('color').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito con la misma talla y color
    const itemExistente = carrito.find(item => 
        item.productoId === productoId && 
        item.talla === talla && 
        item.color === color
    );
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            productoId: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: talla,
            color: color,
            cantidad: cantidad
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${producto.nombre} añadido al carrito!`);
}

// Actualizar contador del carrito en el header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    const contadores = document.querySelectorAll('.cart-count');
    contadores.forEach(contador => {
        contador.textContent = totalItems;
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos según la página
    if (document.getElementById('featured-products')) {
        cargarProductosDestacados();
    }
    
    if (document.getElementById('todos-productos')) {
        cargarTodosLosProductos();
    }
    
    if (document.getElementById('detalle-producto')) {
        cargarDetalleProducto();
    }
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
});