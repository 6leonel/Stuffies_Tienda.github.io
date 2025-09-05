// main.js - Funcionalidad principal para la tienda Stuffies

// Datos de productos (simulando una base de datos)
const productos = [
    {
        id: 1,
        nombre: "HOODIE BOXIFIT WHITE DICE V2",
        precio: 39990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice1.png?v=1753404231&width=1426",
        descripcion: "POLERÓN BOXIFIT AZUL MARINO 'WHITE DICE'.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["azul"],
        destacado: true
    },
    {
        id: 2,
        nombre: "Star Player 'Blue Team't-shirt",
        precio: 21990,
        categoria: "polera",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/1_594f01e1-55e5-4516-b0af-d2befc1aa113.png?v=1748653006&width=1100",
        descripcion: "La Star Player T-Shirt  nace de la unión entre la nostalgia del fútbol clásico y la energía del streetwear actual. Inspirada en conceptos vintage y modernos del Futbol, esta camiseta es una reinterpretación fresca de los kits que marcaron época, llevada al terreno urbano..",
        tallas: ["M", "L", "XL"],
        colores: ["azul"],
        destacado: true
    },
    {
        id: 3,
        nombre: "Stella Chroma Zip Hoodie",
        precio: 45990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/1_8ee3f1b2-2f8a-45ba-bb78-a2f4ba49c4d5.png?v=1756936574&width=600",
        descripcion: "Logos y diseños implementados con serigrafía y bordado para una mayor calidad y durabilidad.",
        tallas: ["28", "30", "32", "34", "36"],
        colores: ["Negro"],
        destacado: true
    },
    {
        id: 4,
        nombre: "Stella Boxy-Slim White Tee",
        precio: 22990,
        categoria: "poleras",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/3_0f38dc89-f9f8-4998-be22-b2e0122e8816.png?v=1756936601&width=600",
        descripcion: "Polera con estampado minimalista en la pecho.",
        tallas: ["S", "M", "L"],
        colores: ["Blanco"],
        destacado: true
    },
    {
        id: 5,
        nombre: "Star Player 'Black Team' t-shirt",
        precio: 15990,
        categoria: "poleras",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/3_f5bf3ad8-c122-436f-8eee-1483a3f383da.png?v=1748652948&width=600",
        descripcion: "Shorts deportivos con tecnología de secado rápido.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro"],
        destacado: false
    },
    {
        id: 6,
        nombre: "HOODIE BOXIFIT RED DICE V2",
        precio: 12990,
        categoria: "polerones",
        imagen: "https://stuffiesconcept.com/cdn/shop/files/RedDice1.png?v=1753404319&width=600",
        descripcion: "POLERÓN BOXIFIT NEGRO RED DICE.",
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro"],
        destacado: false
    }
];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    // Cargar productos según la página
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
    
    // Manejar el formulario de suscripción
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', manejarSuscripcion);
    }
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Configurar navegación móvil si existe
    configurarNavegacionMovil();
});

// Cargar productos destacados en la página principal
function cargarProductosDestacados() {
    const contenedor = document.getElementById('featured-products');
    if (!contenedor) return;
    
    // Obtener productos destacados
    const productosDestacados = productos.filter(producto => producto.destacado);
    
    // Si no hay productos, mostrar mensaje
    if (productosDestacados.length === 0) {
        contenedor.innerHTML = '<p class="empty-message">No hay productos destacados en este momento.</p>';
        return;
    }
    
    // Limitar a 4 productos destacados
    const productosMostrar = productosDestacados.slice(0, 4);
    
    // Generar HTML para los productos
    contenedor.innerHTML = productosMostrar.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
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
    
    // Generar HTML para todos los productos
    contenedor.innerHTML = productos.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
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
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/400x400?text=Imagen+no+disponible'">
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

// Configurar filtros para la página de productos
function configurarFiltros() {
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroPrecio = document.getElementById('filtro-precio');
    const btnAplicarFiltros = document.getElementById('aplicar-filtros');
    
    if (btnAplicarFiltros) {
        btnAplicarFiltros.addEventListener('click', aplicarFiltros);
    }
}

// Aplicar filtros a los productos
function aplicarFiltros() {
    const categoria = document.getElementById('filtro-categoria')?.value || 'todos';
    const precio = document.getElementById('filtro-precio')?.value || 'todos';
    
    let productosFiltrados = [...productos];
    
    // Filtrar por categoría
    if (categoria !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoria);
    }
    
    // Filtrar por precio
    if (precio !== 'todos') {
        switch(precio) {
            case 'menor-20':
                productosFiltrados = productosFiltrados.filter(producto => producto.precio < 20000);
                break;
            case '20-30':
                productosFiltrados = productosFiltrados.filter(producto => producto.precio >= 20000 && producto.precio <= 30000);
                break;
            case '30-40':
                productosFiltrados = productosFiltrados.filter(producto => producto.precio > 30000 && producto.precio <= 40000);
                break;
            case 'mayor-40':
                productosFiltrados = productosFiltrados.filter(producto => producto.precio > 40000);
                break;
        }
    }
    
    // Mostrar productos filtrados
    const contenedor = document.getElementById('todos-productos');
    if (!contenedor) return;
    
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = '<p class="empty-message">No se encontraron productos con los filtros seleccionados.</p>';
        return;
    }
    
    contenedor.innerHTML = productosFiltrados.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
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
    mostrarNotificacion(`¡${producto.nombre} añadido al carrito!`);
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
    mostrarNotificacion(`¡${producto.nombre} añadido al carrito!`);
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

// Manejar suscripción al newsletter
function manejarSuscripcion(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!validarEmail(email)) {
        mostrarNotificacion('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío de suscripción
    setTimeout(() => {
        mostrarNotificacion('¡Gracias por suscribirte a nuestro newsletter!');
        emailInput.value = '';
    }, 500);
}

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar notificación al usuario
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos para la notificación
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.right = '20px';
    notificacion.style.padding = '12px 20px';
    notificacion.style.borderRadius = '4px';
    notificacion.style.color = 'white';
    notificacion.style.zIndex = '1000';
    notificacion.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notificacion.style.opacity = '0';
    notificacion.style.transform = 'translateX(100%)';
    notificacion.style.transition = 'all 0.3s ease';
    
    if (tipo === 'success') {
        notificacion.style.background = '#27ae60';
    } else if (tipo === 'error') {
        notificacion.style.background = '#e74c3c';
    } else {
        notificacion.style.background = '#3498db';
    }
    
    // Agregar al documento
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Configurar navegación móvil
function configurarNavegacionMovil() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Función para buscar productos
function buscarProductos(termino) {
    return productos.filter(producto => 
        producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(termino.toLowerCase())
    );
}

// Inicializar funcionalidad de búsqueda si existe
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const termino = this.value.trim();
            if (termino) {
                const resultados = buscarProductos(termino);
                mostrarResultadosBusqueda(resultados);
            }
        }
    });
}

// Mostrar resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    const contenedor = document.getElementById('resultados-busqueda');
    if (!contenedor) return;
    
    if (resultados.length === 0) {
        contenedor.innerHTML = '<p class="empty-message">No se encontraron productos.</p>';
        return;
    }
    
    contenedor.innerHTML = resultados.map(producto => `
        <div class="product-card">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
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