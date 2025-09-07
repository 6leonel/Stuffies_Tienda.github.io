document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('carrito-items')) {
    cargarCarrito();
    setupEventosCarrito();
  }
});

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
        <p class="cart-item-price">$${Number(item.precio).toLocaleString('es-CL')}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="cambiarCantidad(${index}, -1)">-</button>
        <input type="number" class="quantity-input" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
        <button class="quantity-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
      </div>
      <div class="cart-item-subtotal">
        $${(Number(item.precio) * Number(item.cantidad)).toLocaleString('es-CL')}
      </div>
      <button class="btn btn-danger" onclick="eliminarItem(${index})">Eliminar</button>
    </div>
  `).join('');

  calcularTotal();
}

function setupEventosCarrito() {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', procesarCompra);
}

function cambiarCantidad(index, delta) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (index >= 0 && index < carrito.length) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito?.();
  }
}

function actualizarCantidad(index, nuevaCantidad) {
  const cantidad = parseInt(nuevaCantidad);
  if (isNaN(cantidad) || cantidad < 1) return;
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (index >= 0 && index < carrito.length) {
    carrito[index].cantidad = cantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito?.();
  }
}

function eliminarItem(index) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (index >= 0 && index < carrito.length) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito?.();
  }
}

function calcularTotal() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (Number(item.precio) * Number(item.cantidad)), 0);
  const totalContainer = document.getElementById('carrito-total');
  if (totalContainer) totalContainer.textContent = `$${total.toLocaleString('es-CL')}`;
}

function procesarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  alert('¡Compra realizada con éxito! Serás redirigido a la página de inicio.');
  localStorage.removeItem('carrito');
  actualizarContadorCarrito?.();
  setTimeout(() => { window.location.href = 'index.html'; }, 1000);
}
