const productos = [
  { id: 1, nombre: "HOODIE BOXIFIT WHITE DICE V2", precio: 39990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice1.png?v=1753404231&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/WhiteDice2.png?v=1753404231&width=1426",
    descripcion: "POLERÓN BOXIFIT AZUL MARINO 'WHITE DICE'.",
    tallas: ["S","M","L","XL"], colores: ["azul"], destacado: false },

  { id: 2, nombre: "Star Player 'Blue Team' T-Shirt", precio: 10990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/1_594f01e1-55e5-4516-b0af-d2befc1aa113.png?v=1748653006&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/2_221c9cfc-6049-4eb1-b7ec-3b19bd755c48.png?v=1748653006&width=600",
    descripcion: "La Star Player T-Shirt nace de la unión entre la nostalgia del fútbol clásico y la energía del streetwear actual.",
    tallas: ["M","L","XL"], colores: ["diseño unico"], destacado: false },

  { id: 3, nombre: "Stella Chroma Zip Hoodie", precio: 55990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/1_8ee3f1b2-2f8a-45ba-bb78-a2f4ba49c4d5.png?v=1756936574&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/2_1c0d6df0-c713-49a3-b2bd-b07d19c392ee.png?v=1756936574&width=600",
    descripcion: "Hoodie con cierre frontal y bolsillos.",
    tallas:["S","M","L","XL"], colores:["Negro"], destacado: true },

  { id: 4, nombre: "Stella Boxy-Slim White Tee", precio: 22990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/3_0f38dc89-f9f8-4998-be22-b2e0122e8816.png?v=1756936601&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/4_8a500939-3d78-4b9c-aaab-fc34db0d117d.png?v=1756936601&width=600",
    descripcion: "Camiseta blanca corte boxy-slim.",
    tallas:["S","M","L","XL"], colores:["Blanco"], destacado:false },

  { id: 5, nombre: "Stella Boxy-Slim Black Tee", precio: 15990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/5.png?v=1756936590&width=493",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/6.png?v=1756936591&width=493",
    descripcion: "Polera boxy-slim fit negra",
    tallas:["S","M","L","XL"], colores:["Negro"], destacado:true },

  { id: 6, nombre: "HOODIE BOXIFIT RED DICE V2", precio: 32990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/RedDice1.png?v=1753404319&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/RedDice2.png?v=1753404319&width=600",
    descripcion: "Chaqueta ligera, perfecta para entrenar.",
    tallas:["S","M","L","XL"], colores:["Negro"], destacado:true },

  { id: 7, nombre: "Star Player 'Black Team' t-shirt", precio: 37990, categoria: "poleras",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/3_f5bf3ad8-c122-436f-8eee-1483a3f383da.png?v=1748652948&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/4_b9bc3afc-97e9-4636-94f4-1a863738d755.png?v=1748652948&width=600",
    descripcion: "La Star Player T-Shirt nace de la unión entre la nostalgia del fútbol clásico y la energía del streetwear actual..",
    tallas:["S","M","L","XL"], colores:["Gris"], destacado:true },

  { id: 8, nombre: "HOODIE BOXIFIT PINK DICE V2", precio: 35990, categoria: "polerones",
    imagen: "https://stuffiesconcept.com/cdn/shop/files/PinkDice1.png?v=1753404299&width=600",
    imagenHover: "https://stuffiesconcept.com/cdn/shop/files/PinkDice2.png?v=1753404299&width=600",
    descripcion: "POLERÓN BOXIFIT BROWN 'PINK DICE'",
    tallas:["S","M","L","XL"], colores:["cafe"], destacado:false },

  { id: 9, nombre: "Pantalón Cargo Negro", precio: 22990, categoria: "pantalones",
  imagen: "https://i.postimg.cc/85CnPzS6/920c48b5-ab8b-486d-8681-74fd494c0b6e.avif",
  imagenHover: "https://i.postimg.cc/WjzNN7HP/b0435e27-d353-47fa-ade0-7ce8e83fc9b7.avif",
  descripcion: "Cargo negro con bolsillos laterales y calce relaxed.",
  tallas: ["38","40","42","44","46","48","50","52","54"],
  colores:["Negro"], destacado:false },

  { id: 10, nombre: "Pantalón Jogger Gris", precio: 19990, categoria: "pantalones",
  imagen: "https://img.kwcdn.com/product/fancy/50c868f6-9264-465b-8e4f-01332ba99b8d.jpg?imageView2/2/w/800/q/70/format/avif",
  imagenHover: "https://img.kwcdn.com/product/fancy/642a3b78-e9e3-4b0a-b5f3-e897878511cc.jpg?imageView2/2/w/800/q/70/format/avif",
  descripcion: "Jogger gris, cintura elasticada y puño.",
  tallas: ["38","40","42","44","46","48","50","52","54"],
  colores:["Gris"], destacado:false },

{ id: 11, nombre: "Gorro Beanie Clásico", precio: 9990, categoria: "gorros",
  imagen: "https://img.kwcdn.com/product/fancy/109264d1-93cb-4d8a-af2f-a2e0056f21dc.jpg?imageView2/2/w/800/q/70/format/avif",
  imagenHover: "https://img.kwcdn.com/product/fancy/9b424f95-c691-49cf-9e1b-f2e97355cc98.jpg?imageView2/2/w/800/q/70/format/avif",
  descripcion: "Beanie de punto, unisex, ideal para invierno.",

  tallas: ["54","56","58","60"], unidadTalla: "cm",
  colores:["Negro"], destacado:false },
];

const CART_KEY = 'carrito';
const CLP = new Intl.NumberFormat('es-CL');
const $ = (s) => document.querySelector(s);


const INV_KEY = 'inventario_tallas_v2';

const STOCK_SEMILLA_ESPECIFICO = {
  1: { S:30, M:25, L:10, XL:3 },
  2: { M:1, L:0, XL:5 },
  3: { S:8, M:8, L:8, XL:8 },
  4: { S:0, M:3, L:2, XL:1 },
  5: { S:15, M:15, L:15, XL:15 },
  6: { S:1, M:1, L:1, XL:1 },
  7: { S:0, M:0, L:7, XL:7 },
  8: { S:12, M:0, L:0, XL:0 },
  9: { "38":5, "40":6, "42":4, "44":3, "46":2, "48":1, "50":0, "52":0, "54":7 },
  10:{ "38":30,"40":10,"42":1,"44":0,"46":2,"48":5,"50":3,"52":2,"54":3 },
  11:{ "54":4, "56":9, "58":6, "60":3 },
};

const STOCK_DEFAULT = { S:1, M:30, L:10, XL:20 };

function cargarInventarioTallas() {
  const raw = localStorage.getItem(INV_KEY);
  if (raw) return JSON.parse(raw);

  const inv = {};
  for (const p of productos) {
    if (Array.isArray(p.tallas) && p.tallas.length) {
      const base = STOCK_SEMILLA_ESPECIFICO[p.id] || STOCK_DEFAULT;
    
      const limitado = {};
      for (const t of p.tallas) {
        const key = String(t); 
        limitado[key] = (base[key] ?? 0);
      }
      inv[p.id] = limitado;
    }
  }
  localStorage.setItem(INV_KEY, JSON.stringify(inv));
  return inv;
}
function guardarInventarioTallas(inv) {
  localStorage.setItem(INV_KEY, JSON.stringify(inv));
  window.dispatchEvent(new StorageEvent('storage', { key: INV_KEY, newValue: JSON.stringify(inv) }));
}
let INVENTARIO = cargarInventarioTallas();

function getStock(id, talla) {
  const reg = INVENTARIO[id];
  const key = String(talla);
  return reg ? (reg[key] ?? 0) : 0;
}
function decStock(id, talla, unidades = 1) {
  const key = String(talla);
  if (!INVENTARIO[id]) return false;
  const disp = INVENTARIO[id][key] ?? 0;
  if (disp < unidades) return false;
  INVENTARIO[id][key] = disp - unidades;
  guardarInventarioTallas(INVENTARIO);
  return true;
}
function incStock(id, talla, unidades = 1) {
  const key = String(talla);
  if (!INVENTARIO[id]) return false;
  INVENTARIO[id][key] = (INVENTARIO[id][key] ?? 0) + unidades;
  guardarInventarioTallas(INVENTARIO);
  return true;
}
window.StuffiesInv = { getStock, decStock, incStock }; 

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
  const mini = document.getElementById('cart-total-mini');
  if (mini) mini.textContent = '$' + new Intl.NumberFormat('es-CL').format(total);
}
window.actualizarContadorCarrito = actualizarContadorCarrito;


function formatTallaLabel(producto, tallaStr){
  // añade "cm" para gorros
  if (producto.unidadTalla === 'cm') return `${tallaStr} cm`;
  return tallaStr;
}
function buildSizeSelectHTML(p){
  if (!Array.isArray(p.tallas) || !p.tallas.length) return '';
  const sinStockTotal = p.tallas.every(t => getStock(p.id, t) <= 0);
  const opts = p.tallas.map(t => {
    const tStr = String(t);
    const stk = getStock(p.id, tStr);
    const labelTalla = formatTallaLabel(p, tStr);
    const label = stk > 0 ? `${labelTalla} — ${stk} disp.` : `${labelTalla} — Agotado`;
    const disabled = stk <= 0 ? 'disabled' : '';
    return `<option value="${tStr}" ${disabled}>${label}</option>`;
  }).join('');

  return `
    <div class="mt-2">
      <label class="form-label small mb-1">Talla</label>
      <div class="d-flex gap-2 align-items-center">
        <select class="form-select form-select-sm size-select" data-id="${p.id}">
          ${opts}
        </select>
        <span class="badge ${sinStockTotal ? 'bg-danger':'bg-success'}">
          ${sinStockTotal ? 'SIN STOCK' : 'Con stock'}
        </span>
      </div>
    </div>`;
}

function tarjetaProductoHTML(p){
  const sizeSelect = buildSizeSelectHTML(p);
  const disabledAll = Array.isArray(p.tallas) && p.tallas.length &&
                      p.tallas.every(t => getStock(p.id, t) <= 0);

  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.imagen}" alt="${p.nombre}" class="img-main"
             onerror="this.src='https://via.placeholder.com/250x200?text=Imagen+no+disponible'">
        <img src="${p.imagenHover || p.imagen}" alt="${p.nombre}" class="img-hover">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.nombre}</h3>
        <p class="product-price">$${new Intl.NumberFormat('es-CL').format(p.precio)}</p>

        ${sizeSelect}

        <div class="product-actions mt-2">
          <a href="detalle-producto.html?id=${p.id}" class="btn btn-outline">Ver detalles</a>
          <button class="btn btn-primary btn-add" data-id="${p.id}" ${disabledAll ? "disabled" : ""}>Agregar</button>
        </div>
      </div>
    </div>`;
}

function cargarProductosDestacados(){
  const c = document.getElementById('featured-products'); if(!c) return;
  c.innerHTML = productos.filter(p => p.destacado).map(tarjetaProductoHTML).join('');
  c.addEventListener('click', onClickAgregar);
}

function cargarTodosLosProductos(){
  const c = document.getElementById('todos-productos'); if(!c) return;
  c.innerHTML = productos.map(tarjetaProductoHTML).join('');
  c.removeEventListener('click', onClickAgregar);
  c.addEventListener('click', onClickAgregar);
}

// Click en "Agregar" (usa la talla seleccionada)
function onClickAgregar(e){
  const btn = e.target.closest('.btn-add');
  if (!btn) return;
  const card = btn.closest('.product-card');
  const id = Number(btn.dataset.id);
  const p = productos.find(x => Number(x.id) === id);
  if (!p) return;

  let talla = null;
  if (Array.isArray(p.tallas) && p.tallas.length){
    const select = card.querySelector('.size-select');
    talla = select?.value || String(p.tallas[0]);
    if (getStock(p.id, talla) <= 0) {
      alert(`La talla ${formatTallaLabel(p, talla)} está agotada en "${p.nombre}".`);
      (card.parentElement || document).dispatchEvent(new Event('refresh-grid'));
      return;
    }
  }
  agregarAlCarrito(p.id, talla, (p.colores && p.colores[0]) || null, 1);
}

// =========== Filtros ===========
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
    const cat = (selCat.value || '').trim().toLowerCase();
    const rango = selPrecio.value;
    const list = productos.filter(p => {
      const catNorm = String(p.categoria || '').trim().toLowerCase();
      const okCat = (cat === 'todos' || cat === '') ? true : (catNorm === cat);
      const okPrecio = enRango(p.precio, rango);
      return okCat && okPrecio;
    });
    pintar(list);
  }

  window.addEventListener('storage', (ev) => {
    if (ev.key === INV_KEY) aplicar();
  });
  cont.addEventListener('refresh-grid', aplicar);

  pintar(productos);
  btn.addEventListener('click', aplicar);
}

function getQueryParam(name){ return new URL(window.location.href).searchParams.get(name); }

function cargarDetalleProducto(){
  const ctn = document.getElementById('detalle-producto'); if(!ctn) return;
  const id = Number(getQueryParam('id'));
  const p = productos.find(x => Number(x.id) === id);
  if(!p){ ctn.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>'; return; }

  const tallaDefault = (p.tallas && String(p.tallas[0])) || 'Única';
  const colorDefault = (p.colores && p.colores[0]) || 'Único';

  const tallaOptions = (p.tallas || [tallaDefault]).map(t => {
    const tStr = String(t);
    const stk = Array.isArray(p.tallas) ? getStock(p.id, tStr) : 0;
    const labelTalla = formatTallaLabel(p, tStr);
    const label = Array.isArray(p.tallas) ? `${labelTalla} — ${stk} disp.` : labelTalla;
    const disabled = Array.isArray(p.tallas) && stk <= 0 ? 'disabled' : '';
    return `<option value="${tStr}" ${disabled}>${label}</option>`;
  }).join('');

  const allOut = Array.isArray(p.tallas) && p.tallas.every(t => getStock(p.id, t) <= 0);

  ctn.innerHTML = `
    <div class="product-detail-card">
      <div class="detail-image">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="detail-info">
        <h2>${p.nombre}</h2>
        <p class="detail-price">$${new Intl.NumberFormat('es-CL').format(p.precio)}</p>
        <p class="detail-desc">${p.descripcion || ''}</p>

        <div class="detail-options">
          <label>Talla</label>
          <select id="detalle-talla" class="form-select">
            ${tallaOptions}
          </select>

          <label class="mt-2">Color</label>
          <select id="detalle-color" class="form-select">
            ${(p.colores || [colorDefault]).map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>

        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-primary" id="btn-add-detalle" ${allOut ? 'disabled' : ''}>Añadir</button>
          <a class="btn btn-outline" href="productos.html">Seguir comprando</a>
        </div>
      </div>
    </div>`;

  document.getElementById('btn-add-detalle').addEventListener('click', () => {
    const talla = document.getElementById('detalle-talla')?.value || tallaDefault;
    const color = document.getElementById('detalle-color')?.value || colorDefault;

    if (Array.isArray(p.tallas) && getStock(p.id, talla) <= 0) {
      alert(`La talla ${formatTallaLabel(p, talla)} está agotada.`);
      cargarDetalleProducto(); // refresca opciones
      return;
    }
    agregarAlCarrito(p.id, talla, color, 1);
  });
}

function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function setCart(arr){ localStorage.setItem(CART_KEY, JSON.stringify(arr)); }
function getCartTotals(){
  const cart = getCart();
  const cantidad = cart.reduce((a,i)=> a + (Number(i.cantidad)||0), 0);
  const total = cart.reduce((a,i)=> a + (Number(i.precio) * (Number(i.cantidad)||0)), 0);
  return { cantidad, total };
}

function agregarAlCarrito(id, talla = null, color = null, cantidad = 1){
  const p = productos.find(x => Number(x.id) === Number(id));
  if(!p) return;

  if (Array.isArray(p.tallas) && p.tallas.length){
    const t = talla || String(p.tallas[0]);
    if (getStock(p.id, t) <= 0) {
      alert(`La talla ${formatTallaLabel(p, t)} está agotada en "${p.nombre}".`);
      return;
    }
    const ok = decStock(p.id, t, cantidad);
    if (!ok) {
      alert(`No hay stock suficiente de talla ${formatTallaLabel(p, t)}.`);
      return;
    }
  }

  const item = {
    id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen,
    talla: talla || (Array.isArray(p.tallas) ? String(p.tallas[0]) : 'Única'),
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
      toastEl.innerHTML = `<div class="toast-body">Añadido ✅ — Total: $${new Intl.NumberFormat('es-CL').format(total)}</div>`;
      document.body.appendChild(toastEl);
      new bootstrap.Toast(toastEl, { delay: 1500 }).show();
      setTimeout(() => toastEl.remove(), 1700);
    } else {
      const { total } = getCartTotals();
      alert('Añadido al carrito. Total: $' + new Intl.NumberFormat('es-CL').format(total));
    }
  } catch(_) {}
}
window.agregarAlCarrito = agregarAlCarrito;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featured-products')) cargarProductosDestacados();
  if (document.getElementById('todos-productos')) { cargarTodosLosProductos(); configurarFiltros(); }
  if (document.getElementById('detalle-producto')) cargarDetalleProducto();
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) subscribeForm.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Gracias por suscribirte.'); });
  actualizarContadorCarrito?.();
});
