// Funcionalidad del carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carrito-items')) {
        cargarCarrito();
        setupEventosCarrito();
    }
});

// Cargar items del carrito
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('carrito-total');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        totalContainer.textContent = '$0';
        return;
    }
    
    contenedor.innerHTML = carrito.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="cart-item-details">
                <h3>${item.nombre}</h3>
                <p>Talla: ${item.talla} | Color: ${item.color}</p>
                <p class="cart-item-price">$${item.precio.toLocaleString('es-CL')}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
            <div class="cart-item-subtotal">
                $${(item.precio * item.cantidad).toLocaleString('es-CL')}
            </div>
            <button class="btn btn-danger" onclick="eliminarItem(${index})">Eliminar</button>
        </div>
    `).join('');
    
    calcularTotal();
}

// Configurar eventos del carrito
function setupEventosCarrito() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', procesarCompra);
    }
}

// Cambiar cantidad de un item
function cambiarCantidad(index, delta) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (index >= 0 && index < carrito.length) {
        carrito[index].cantidad += delta;
        
        if (carrito[index].cantidad < 1) {
            carrito[index].cantidad = 1;
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Actualizar cantidad desde input
function actualizarCantidad(index, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad);
    if (isNaN(cantidad) || cantidad < 1) return;
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (index >= 0 && index < carrito.length) {
        carrito[index].cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Eliminar item del carrito
function eliminarItem(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Calcular total del carrito
function calcularTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    const totalContainer = document.getElementById('carrito-total');
    if (totalContainer) {
        totalContainer.textContent = `$${total.toLocaleString('es-CL')}`;
    }
}

// Procesar compra
function procesarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Simular proceso de compra
    alert('¡Compra realizada con éxito! Serás redirigido a la página de inicio.');
    
    // Limpiar carrito
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
    
    // Redirigir a inicio
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}