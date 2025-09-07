/* =========================
   Catálogo de productos
   ========================= */
const productos = [
  { id: 1, nombre: "HOODIE BOXIFIT WHITE DICE V2", precio: 39990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice1.png?v=1753404231&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice2.png?v=1753404231&width=1426",
    descripcion: "POLERÓN BOXIFIT AZUL MARINO 'WHITE DICE'.", tallas: ["S","M","L","XL"], colores: ["azul"], destacado: false },
  { id: 2, nombre: "Star Player 'Blue Team' T-Shirt", precio: 10990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/1_594f01e1-55e5-4516-b0af-d2befc1aa113.png?v=1748653006&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/2_221c9cfc-6049-4eb1-b7ec-3b19bd755c48.png?v=1748653006&width=600",
    descripcion: "La Star Player T-Shirt nace de la unión entre la nostalgia del fútbol clásico y la energía del streetwear actual.",
    tallas: ["M","L","XL"], colores: ["diseño unico"], destacado: false },
  { id: 3, nombre: "Stella Chroma Zip Hoodie", precio: 55990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/1_8ee3f1b2-2f8a-45ba-bb78-a2f4ba49c4d5.png?v=1756936574&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/2_1c0d6df0-c713-49a3-b2bd-b07d19c392ee.png?v=1756936574&width=600",
    descripcion: "Hoodie con cierre frontal y bolsillos.", tallas:["S","M","L","XL"], colores:["Negro"], destacado: true },
  { id: 4, nombre: "Stella Boxy-Slim White Tee", precio: 22990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/3_0f38dc89-f9f8-4998-be22-b2e0122e8816.png?v=1756936601&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/4_8a500939-3d78-4b9c-aaab-fc34db0d117d.png?v=1756936601&width=600",
    descripcion: "Camiseta blanca corte boxy-slim.", tallas:["S","M","L","XL"], colores:["Blanco"], destacado:false },
  { id: 5, nombre: "Stella Boxy-Slim Black Tee", precio: 15990, categoria: "poleras ",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/5.png?v=1756936590&width=493",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/6.png?v=1756936591&width=493",
    descripcion: "Gorra ajustable con logo bordado.", tallas:["S","M","L","XL"], colores:["Negro"], destacado:true },
  { id: 6, nombre: "HOODIE BOXIFIT RED DICE V2", precio: 32990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/RedDice1.png?v=1753404319&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/RedDice2.png?v=1753404319&width=600",
    descripcion: "Chaqueta ligera, perfecta para entrenar.", tallas:["S","M","L","XL"], colores:["Negro"], destacado:true },
  { id: 7, nombre: "Star Player 'Black Team' t-shirt", precio: 37990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/3_f5bf3ad8-c122-436f-8eee-1483a3f383da.png?v=1748652948&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/4_b9bc3afc-97e9-4636-94f4-1a863738d755.png?v=1748652948&width=600",
    descripcion: "Polerón clásico con bolsillo canguro.", tallas:["S","M","L","XL"], colores:["Gris"], destacado:true },
  { id: 8, nombre: "HOODIE BOXIFIT PINK DICE V2", precio: 35990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/PinkDice1.png?v=1753404299&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/PinkDice2.png?v=1753404299&width=600",
    descripcion: "Gorra urbana estilo minimalista con logo bordado Stuffies.", tallas:["S","M","L","XL"], colores:["cafe"], destacado:false }
];

/* =========================
   Utils carrito + formato
   ========================= */
const CART_KEY = 'carrito';
const CLP = new Intl.NumberFormat('es-CL');
const $ = (s) => document.querySelector(s);

function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function setCart(arr){ localStorage.setItem(CART_KEY, JSON.stringify(arr)); }
function getCartTotals(){
  const cart = getCart();
  const cantidad = cart.reduce((a,i)=> a + (Number(i.cantidad)||0), 0);
  const total = cart.reduce((a,i)=> a + (Number(i.precio) * (Number(i.cantidad)||0)), 0);
  return { cantidad, total };
}
function actualizarContadorCarrito(){
  const { cantidad, total } = getCartTotals();
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = cantidad;
  const mini = document.getElementById('cart-total-mini'); // opcional
  if (mini) mini.textContent = '$' + CLP.format(total);
}
window.actualizarContadorCarrito = actualizarContadorCarrito;

/* =========================
   Boot
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featured-products')) cargarProductosDestacados();
  if (document.getElementById('todos-productos')) { cargarTodosLosProductos(); configurarFiltros(); }
  if (document.getElementById('detalle-producto')) cargarDetalleProducto();

  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) subscribeForm.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Gracias por suscribirte.'); });

  actualizarContadorCarrito?.();
});

/* =========================
   Listados / Tarjetas
   ========================= */
function tarjetaProductoHTML(p){
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.imagen}" alt="${p.nombre}" class="img-main"
             onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
        <img src="${p.imagenHover || p.imagen}" alt="${p.nombre}" class="img-hover">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.nombre}</h3>
        <p class="product-price">$${CLP.format(p.precio)}</p>
        <div class="product-actions">
          <a href="detalle-producto.html?id=${p.id}" class="btn btn-outline">Ver detalles</a>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Añadir</button>
        </div>
      </div>
    </div>`;
}
function cargarProductosDestacados(){
  const c = document.getElementById('featured-products'); if(!c) return;
  c.innerHTML = productos.filter(p => p.destacado).map(tarjetaProductoHTML).join('');
}
function cargarTodosLosProductos(){
  const c = document.getElementById('todos-productos'); if(!c) return;
  c.innerHTML = productos.map(tarjetaProductoHTML).join('');
}

/* =========================
   Filtros / Detalle
   ========================= */
function getQueryParam(name){ return new URL(window.location.href).searchParams.get(name); }

function configurarFiltros(){
  const cont = document.getElementById('todos-productos');
  const selCat = document.getElementById('filtro-categoria');
  const selPrecio = document.getElementById('filtro-precio');
  const btn = document.getElementById('aplicar-filtros');
  if(!cont || !selCat || !selPrecio || !btn) return;

  function pintar(list){ cont.innerHTML = list.map(tarjetaProductoHTML).join(''); }
  function enRango(precio, sel){
    switch(sel){
      case '0-20000': return precio <= 20000;
      case '20000-35000': return precio >= 20000 && precio <= 35000;
      case '35000-50000': return precio >= 35000 && precio <= 50000;
      case '50000-': return precio >= 50000;
      default: return true;
    }
  }
  function aplicar(){
    const cat = (selCat.value || '').trim();
    const rango = selPrecio.value;
    const list = productos.filter(p => {
      const okCat = (cat === 'todos' || cat === '') ? true : (String(p.categoria).trim() === cat);
      const okPrecio = enRango(p.precio, rango);
      return okCat && okPrecio;
    });
    pintar(list);
  }
  pintar(productos);
  btn.addEventListener('click', aplicar);
}

function cargarDetalleProducto(){
  const ctn = document.getElementById('detalle-producto'); if(!ctn) return;
  const id = Number(getQueryParam('id'));
  const p = productos.find(x => Number(x.id) === id);
  if(!p){ ctn.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>'; return; }

  const tallaDefault = (p.tallas && p.tallas[0]) || 'Única';
  const colorDefault = (p.colores && p.colores[0]) || 'Único';

  ctn.innerHTML = `
    <div class="product-detail-card">
      <div class="detail-image">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="detail-info">
        <h2>${p.nombre}</h2>
        <p class="detail-price">$${CLP.format(p.precio)}</p>
        <p class="detail-desc">${p.descripcion || ''}</p>

        <div class="detail-options">
          <label>Talla</label>
          <select id="detalle-talla" class="form-select">
            ${(p.tallas || [tallaDefault]).map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>

          <label class="mt-2">Color</label>
          <select id="detalle-color" class="form-select">
            ${(p.colores || [colorDefault]).map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>

        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-primary" id="btn-add-detalle">Añadir</button>
          <a class="btn btn-outline" href="productos.html">Seguir comprando</a>
        </div>
      </div>
    </div>`;
  document.getElementById('btn-add-detalle').addEventListener('click', () => {
    const talla = document.getElementById('detalle-talla')?.value || tallaDefault;
    const color = document.getElementById('detalle-color')?.value || colorDefault;
    agregarAlCarrito(p.id, talla, color, 1);
  });
}

/* =========================
   Carrito (añadir)
   ========================= */
function agregarAlCarrito(id, talla = null, color = null, cantidad = 1){
  const p = productos.find(x => Number(x.id) === Number(id));
  if(!p) return;
  const item = {
    id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen,
    talla: talla || (p.tallas && p.tallas[0]) || 'Única',
    color: color || (p.colores && p.colores[0]) || 'Único',
    cantidad: cantidad || 1
  };
  const cart = getCart();
  const idx = cart.findIndex(x => x.id === item.id && x.talla === item.talla && x.color === item.color);
  if(idx >= 0) cart[idx].cantidad += item.cantidad; else cart.push(item);
  setCart(cart);

  actualizarContadorCarrito();

  try {
    if (window.bootstrap && bootstrap.Toast) {
      const { total } = getCartTotals();
      const toastEl = document.createElement('div');
      toastEl.className = 'toast text-bg-success position-fixed bottom-0 end-0 m-3';
      toastEl.innerHTML = `<div class="toast-body">Añadido ✅ — Total: $${CLP.format(total)}</div>`;
      document.body.appendChild(toastEl);
      new bootstrap.Toast(toastEl, { delay: 1500 }).show();
      setTimeout(() => toastEl.remove(), 1700);
    } else {
      const { total } = getCartTotals();
      alert('Añadido al carrito. Total: $' + CLP.format(total));
    }
  } catch(_) {}
}
window.agregarAlCarrito = agregarAlCarrito;
