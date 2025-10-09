(function () {
  const $grid = document.getElementById("todos-productos") || document.getElementById("all-products");
  const $buscador = document.getElementById("buscador");
  const $orden = document.getElementById("orden");
  const $noResults = document.getElementById("no-results");
  if (!$grid) return;

  const DATA = (window.productos || []).slice();
  const fmt = (v) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Number(v) || 0);

  function formatTallaLabel(p, t) {
    return p.unidadTalla === "cm" ? `${t} cm` : String(t);
  }
  function getStock(id, talla) {
    if (!window.StuffiesInv || typeof window.StuffiesInv.getStock !== "function") return 0;
    return window.StuffiesInv.getStock(id, talla);
  }

  function card(p) {
    const tieneTallas = Array.isArray(p.tallas) && p.tallas.length;
    let sinStockTotal = false;
    let sizeSelect = "";
    if (tieneTallas) {
      sinStockTotal = p.tallas.every(t => getStock(p.id, String(t)) <= 0);
      const opts = p.tallas.map(t => {
        const key = String(t);
        const stk = getStock(p.id, key);
        const label = stk > 0 ? `${formatTallaLabel(p, key)} — ${stk} disp.` : `${formatTallaLabel(p, key)} — Agotado`;
        const dis = stk <= 0 ? "disabled" : "";
        return `<option value="${key}" ${dis}>${label}</option>`;
      }).join("");
      sizeSelect = `
        <div class="mt-2">
          <label class="form-label small mb-1">Talla</label>
          <div class="d-flex gap-2 align-items-center">
            <select class="form-select form-select-sm size-select" data-id="${p.id}">
              ${opts}
            </select>
            <span class="badge ${sinStockTotal ? "bg-danger" : "bg-success"}">
              ${sinStockTotal ? "SIN STOCK" : "Con stock"}
            </span>
          </div>
        </div>`;
    }
    const btnDis = tieneTallas ? (sinStockTotal ? "disabled" : "") : "";
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="card h-100 shadow-sm product-card" data-id="${p.id}">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/600x400?text=Imagen'">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text mb-2">${fmt(p.precio)}</p>
            ${sizeSelect}
            <div class="mt-auto d-flex gap-2">
              <a href="detalle-producto.html?id=${encodeURIComponent(p.id)}" class="btn btn-outline-primary rounded-pill px-4">Ver detalles</a>
              <button class="btn btn-primary rounded-pill px-4 btn-add" ${btnDis}>Agregar</button>
            </div>
          </div>
        </article>
      </div>`;
  }

  function pintar(lista) {
    if (!lista.length) {
      $grid.innerHTML = "";
      $noResults?.classList.remove("d-none");
      return;
    }
    $noResults?.classList.add("d-none");
    $grid.innerHTML = lista.map(card).join("");
  }

  function filtrarYOrdenar() {
    const q = ($buscador?.value || "").trim().toLowerCase();
    let out = DATA.filter(p => (p.nombre || "").toLowerCase().includes(q));
    switch ($orden?.value) {
      case "precio-asc": out.sort((a, b) => (a.precio || 0) - (b.precio || 0)); break;
      case "precio-desc": out.sort((a, b) => (b.precio || 0) - (a.precio || 0)); break;
      case "nombre-asc": out.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")); break;
      case "nombre-desc": out.sort((a, b) => b.nombre.localeCompare(a.nombre, "es")); break;
    }
    pintar(out);
  }

  $buscador?.addEventListener("input", filtrarYOrdenar);
  $orden?.addEventListener("change", filtrarYOrdenar);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const card = btn.closest(".product-card");
    const id = Number(card?.dataset?.id);
    const prod = (window.productos || []).find(p => Number(p.id) === id);
    if (!prod) return;

    let talla = null;
    if (Array.isArray(prod.tallas) && prod.tallas.length) {
      const select = card.querySelector(".size-select");
      talla = select?.value || String(prod.tallas[0]);
      const stk = getStock(prod.id, talla);
      if (stk <= 0) {
        alert(`La talla ${prod.unidadTalla === "cm" ? talla + " cm" : talla} está agotada en "${prod.nombre}".`);
        filtrarYOrdenar();
        return;
      }
    }

    if (typeof window.agregarAlCarrito === "function") {
      window.agregarAlCarrito(prod.id, talla, (prod.colores && prod.colores[0]) || null, 1);
    } else {
      alert(`Añadido: ${prod.nombre}`);
    }
  });

  window.addEventListener("storage", (ev) => {
    if (ev.key === "inventario_tallas_v2") filtrarYOrdenar();
  });

  filtrarYOrdenar();
})();
