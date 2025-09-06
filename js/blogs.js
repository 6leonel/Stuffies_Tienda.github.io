// === Datos de ejemplo (puedes reemplazar por fetch a tu backend/JSON) ===
const BLOGS = [
  {
    id: 1,
    titulo: "La esencia del streetwear chileno",
    categoria: "Estilo",
    fecha: "2025-08-20",
    lecturaMin: 4,
    imagen: "https://via.placeholder.com/900x500.png?text=Streetwear+Chileno",
    resumen: "Cómo se vive la cultura urbana en Chile y por qué influye en nuestra ropa.",
    contenidoHTML: `
      <p>El streetwear chileno mezcla influencias globales con identidad local. En Stuffies nos enfocamos en cortes cómodos, tipografías limpias y materiales durables.</p>
      <ul>
        <li>Cortes boxy y oversized</li>
        <li>Materiales pesados para caída premium</li>
        <li>Gráficas inspiradas en la cultura local</li>
      </ul>
    `
  },
  {
    id: 2,
    titulo: "Guía rápida: cómo elegir tu hoodie ideal",
    categoria: "Tutoriales",
    fecha: "2025-08-05",
    lecturaMin: 3,
    imagen: "https://via.placeholder.com/900x500.png?text=Guia+Hoodie",
    resumen: "Telas, pesos y fits que marcan la diferencia al comprar un polerón.",
    contenidoHTML: `
      <p>Fíjate en el gramaje (g/m²), el fit (boxy, regular) y detalles como costuras reforzadas o cierres metálicos. Un hoodie bien hecho te acompaña años.</p>
    `
  },
  {
    id: 3,
    titulo: "Drop de septiembre: lo nuevo en Stuffies",
    categoria: "Noticias",
    fecha: "2025-09-01",
    lecturaMin: 2,
    imagen: "https://via.placeholder.com/900x500.png?text=Drop+Septiembre",
    resumen: "Colores neutros, logos minimalistas y una cápsula limitada.",
    contenidoHTML: `
      <p>Este mes lanzamos una cápsula limitada con colores tierra y logos bordados. ¡Stock acotado!</p>
    `
  },
  {
    id: 4,
    titulo: "3 looks con una polera blanca",
    categoria: "Estilo",
    fecha: "2025-07-15",
    lecturaMin: 5,
    imagen: "https://via.placeholder.com/900x500.png?text=Polera+Blanca",
    resumen: "Versatilidad total: de casual a smart-casual con una sola prenda.",
    contenidoHTML: `
      <ol>
        <li>Casual urbano: jeans loose + zapatillas blancas.</li>
        <li>Layering: camisa abierta + pantalón cargo.</li>
        <li>Smart: blazer ligero + chinos.</li>
      </ol>
    `
  }
];

// === Estado UI ===
const state = {
  page: 1,
  pageSize: 6,
  search: "",
  category: "*",
  filtered: BLOGS
};

// === Helpers de elementos ===
const $grid = () => document.getElementById("blogs-grid");
const $search = () => document.getElementById("blog-search");
const $cat = () => document.getElementById("blog-category");
const $apply = () => document.getElementById("blog-apply");
const $prev = () => document.getElementById("prev-page");
const $next = () => document.getElementById("next-page");
const $pageInd = () => document.getElementById("page-indicator");

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
}

// === Filtros ===
function applyFilters() {
  const q = state.search.toLowerCase().trim();
  state.filtered = BLOGS
    .filter(b => {
      const okCat = state.category === "*" ? true : (b.categoria === state.category);
      const txt = (b.titulo + " " + b.resumen).toLowerCase();
      const okSearch = q ? txt.includes(q) : true;
      return okCat && okSearch;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  state.page = 1;
  render();
}

// === Pintado de tarjetas y paginación ===
function render() {
  const grid = $grid();
  if (!grid) return;

  const start = (state.page - 1) * state.pageSize;
  const end = start + state.pageSize;
  const slice = state.filtered.slice(start, end);

  grid.innerHTML = slice.map(b => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 bg-dark text-light border-secondary">
        <img src="${b.imagen}" class="card-img-top" alt="${b.titulo}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-secondary">${b.categoria}</span>
            <small class="text-muted">${formatDate(b.fecha)}</small>
          </div>
          <h5 class="card-title">${b.titulo}</h5>
          <p class="card-text text-secondary">${b.resumen}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-light btn-sm" data-open="${b.id}">Leer más</button>
            <small class="text-muted">${b.lecturaMin} min</small>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  $pageInd().textContent = `Página ${state.page} de ${totalPages}`;
  $prev().disabled = state.page <= 1;
  $next().disabled = state.page >= totalPages;

  grid.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => openModal(parseInt(btn.getAttribute("data-open"), 10)));
  });
}

// === Modal ===
function openModal(id) {
  const b = BLOGS.find(x => x.id === id);
  if (!b) return;
  document.getElementById("blogModalTitle").textContent = b.titulo;
  document.getElementById("blogModalImg").src = b.imagen;
  document.getElementById("blogModalCat").textContent = b.categoria;
  document.getElementById("blogModalDate").textContent = formatDate(b.fecha);
  document.getElementById("blogModalRead").textContent = `${b.lecturaMin} min de lectura`;
  document.getElementById("blogModalContent").innerHTML = b.contenidoHTML;

  if (!window._blogModal) {
    window._blogModal = new bootstrap.Modal(document.getElementById("blogModal"));
  }
  window._blogModal.show();
}

// === Listeners ===
document.addEventListener("DOMContentLoaded", () => {
  // Carrusel auto
  const carr = document.getElementById("stuffiesCarousel");
  if (carr && window.bootstrap?.Carousel) {
    new bootstrap.Carousel(carr, { interval: 3500, ride: "carousel", pause: false, touch: true, wrap: true });
  }

  $apply()?.addEventListener("click", () => {
    state.search = $search().value;
    state.category = $cat().value;
    applyFilters();
  });

  $prev()?.addEventListener("click", () => { state.page--; render(); });
  $next()?.addEventListener("click", () => { state.page++; render(); });

  $search()?.addEventListener("keydown", (e) => { if (e.key === "Enter") $apply().click(); });

  // Primera renderización
  applyFilters();
});
