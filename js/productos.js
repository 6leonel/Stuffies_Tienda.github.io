// js/render-productos.js
// Requiere que js/productos.js exponga window.PRODUCTOS = [ { id, nombre, precio, moneda?, imagenPrincipal, agotado?, ... } ]

(function () {
  const $grid = document.getElementById("all-products");
  const $buscador = document.getElementById("buscador");
  const $orden = document.getElementById("orden");
  const $noResults = document.getElementById("no-results");

  if (!$grid) return;

  // Fuente de datos
  const DATA = (window.PRODUCTOS || []).slice(); // copia

  const fmt = (valor, moneda = "CLP") =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0
    }).format(Number(valor) || 0);

  function plantillaCard(p) {
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="card h-100 shadow-sm product-card" data-id="${p.id}">
          <img src="${p.imagenPrincipal}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text mb-3">${fmt(p.precio, p.moneda)}</p>
            <div class="mt-auto d-flex gap-2">
              <a href="producto.html?id=${encodeURIComponent(p.id)}"
                 class="btn btn-outline-primary rounded-pill px-4">
                Ver detalles
              </a>
              <button class="btn btn-primary rounded-pill px-4 btn-add"
                      ${p.agotado ? "disabled" : ""}>
                ${p.agotado ? "Agotado" : "Añadir"}
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function pintar(lista) {
    if (!lista.length) {
      $grid.innerHTML = "";
      $noResults?.classList.remove("d-none");
      return;
    }
    $noResults?.classList.add("d-none");
    $grid.innerHTML = lista.map(plantillaCard).join("");
  }

  function filtrarYOrdenar() {
    const q = ($buscador?.value || "").trim().toLowerCase();

    let out = DATA.filter(p =>
      p.nombre?.toLowerCase().includes(q)
    );

    switch ($orden?.value) {
      case "precio-asc":
        out.sort((a, b) => (a.precio || 0) - (b.precio || 0));
        break;
      case "precio-desc":
        out.sort((a, b) => (b.precio || 0) - (a.precio || 0));
        break;
      case "nombre-asc":
        out.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        break;
      case "nombre-desc":
        out.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
        break;
      default:
        // "recientes" (no hay fecha en el dataset; si agregas p.fecha, ordénalo aquí)
        break;
    }

    pintar(out);
  }

  // Eventos UI
  $buscador?.addEventListener("input", filtrarYOrdenar);
  $orden?.addEventListener("change", filtrarYOrdenar);

  // Delegación para botón "Añadir" (conecta con tu carrito si ya existe)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;

    const card = btn.closest(".product-card");
    const id = card?.dataset?.id;
    const prod = (window.PRODUCTOS || []).find(p => String(p.id) === String(id));
    if (!prod) return;

    if (typeof window.agregarAlCarrito === "function") {
      // ejemplo: tu carrito puede usar {id, cantidad}
      window.agregarAlCarrito({ id: prod.id, cantidad: 1 });
    } else {
      // fallback simple
      alert(`Añadido: ${prod.nombre}`);
    }
  });

  // Primera pintura
  filtrarYOrdenar();
})();
