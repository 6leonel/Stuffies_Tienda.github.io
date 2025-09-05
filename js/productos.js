// Datos de productos con imágenes externas (NO dependen de /assets)
const IMG = "https://stuffiesconcept.com/cdn/shop/files/WhiteDice1.png?v=1753404231&width=1426";

const productos = [
  {
    id: 1,
    nombre: "Polera Oversize Negra",
    precio: 19990,
    categoria: "poleras",
    imagen: IMG,
    descripcion: "Polera oversize de algodón 100% con estampado frontal.",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Blanco", "Gris"]
  },
  {
    id: 2,
    nombre: "Polerón Boxy Fit Gris",
    precio: 39990,
    categoria: "polerones",
    imagen: IMG,
    descripcion: "Polerón con capucha y bolsillo canguro, corte boxy fit.",
    tallas: ["M", "L", "XL"],
    colores: ["Gris", "Negro"]
  },
  {
    id: 3,
    nombre: "Jeans Slim Fit",
    precio: 45990,
    categoria: "jeans",
    imagen: IMG,
    descripcion: "Jeans slim fit de tiro medio con stretch para mayor comodidad.",
    tallas: ["28", "30", "32", "34", "36"],
    colores: ["Azul oscuro", "Azul claro", "Negro"]
  },
  {
    id: 4,
    nombre: "Polera Estampada",
    precio: 22990,
    categoria: "poleras",
    imagen: IMG,
    descripcion: "Polera con estampado artístico en la espalda y detalles en mangas.",
    tallas: ["S", "M", "L"],
    colores: ["Blanco", "Negro"]
  }
];

// Cargar productos destacados en la página principal
function cargarProductosDestacados() {
  const contenedor = document.getElementById('featured-products');
  if (!contenedor) return;

  const productosDestacados = productos.slice(0, 4);

  contenedor.innerHTML = productosDestacados.map(producto => `
    <div class="product-card">
      <div class="product-image">
        <img src="${producto.imagen}" alt="${producto.nombre}"
             onerror="this.src='https://via.placeholder.com/600x400?text=Sin+imagen'">
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
        <img src="${producto.imagen}" alt="${producto.nombre}"
             onerror="this.src='https://via.placeholder.com/600x400?text=Sin+imagen'">
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
      <img src="${producto.imagen}" alt="${producto.nombre}"
           onerror="this.src='https://via.placeholder.com/800x800?text=Sin+imagen'">
    </div>
    <div class="product-detail-info">
      <h1>${producto.nombre}</h1>
      <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
      <p class="product-description">${producto.descripcion}</p>

      <div class="product-options">
        <div class="form-group">
          <label for="talla">Talla:</label>
          <select id="talla" name="talla">
            ${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="color">Color:</label>
          <select id="color" name="color">
            ${producto.colores.map(c => `<option value="${c}">${c}</option>`).join('')}
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
