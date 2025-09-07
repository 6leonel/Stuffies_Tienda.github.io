const admin = {
  init() {
    this.setupNavigation();
    this.setupEventListeners();
  },

  setupNavigation() {
    const navButtons = document.querySelectorAll('.admin-nav-btn');
    navButtons.forEach(button => {
      button.addEventListener('click', function () {
        const targetSection = this.getAttribute('data-section');
        admin.showSection(targetSection);
      });
    });
  },

  showSection(sectionId) {
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-section') === sectionId);
    });
    document.querySelectorAll('.admin-section').forEach(section => {
      section.classList.toggle('active', section.id === sectionId);
    });
  },

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-completar')) {
        const orderId = e.target.closest('tr')?.querySelector('td:first-child')?.textContent?.trim();
        if (orderId) this.marcarCompletado(orderId);
      }
      if (e.target.classList.contains('btn-enviar')) {
        const orderId = e.target.closest('tr')?.querySelector('td:first-child')?.textContent?.trim();
        if (orderId) this.marcarEnviado(orderId);
      }
      if (e.target.classList.contains('btn-editar')) {
        const productId = e.target.closest('tr')?.querySelector('td:first-child')?.textContent?.trim();
        if (productId) this.editarProducto(productId);
      }
      if (e.target.classList.contains('btn-desactivar')) {
        const productId = e.target.closest('tr')?.querySelector('td:first-child')?.textContent?.trim();
        if (productId) this.desactivarProducto(productId);
      }
    });

    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]')?.value || '';
        this.suscribirEmail(email.trim());
      });
    }
  },

  findRowByFirstCellText(idText) {
    const rows = document.querySelectorAll('table tbody tr');
    for (const row of rows) {
      const first = row.querySelector('td:first-child');
      if (first && first.textContent.trim() === String(idText)) return row;
    }
    return null;
  },

  marcarEnviado(orderId) {
    if (!confirm(`¿Marcar pedido ${orderId} como enviado?`)) return;
    const row = this.findRowByFirstCellText(orderId);
    if (!row) return;
    const statusCell = row.querySelector('td:nth-child(6)');
    if (!statusCell) return;
    statusCell.innerHTML = '<span class="status-badge status-enviado">Enviado</span>';
    const actionCell = statusCell.nextElementSibling;
    if (actionCell) actionCell.innerHTML = '<button class="btn btn-success btn-action btn-completar">Completar</button>';
    alert(`Pedido ${orderId} marcado como enviado`);
  },

  marcarCompletado(orderId) {
    if (!confirm(`¿Marcar pedido ${orderId} como completado?`)) return;
    const row = this.findRowByFirstCellText(orderId);
    if (!row) return;
    const statusCell = row.querySelector('td:nth-child(6)');
    if (!statusCell) return;
    statusCell.innerHTML = '<span class="status-badge status-completado">Completado</span>';
    const actionCell = statusCell.nextElementSibling;
    if (actionCell) actionCell.innerHTML = '<button class="btn btn-primary btn-action">Ver</button>';
    alert(`Pedido ${orderId} marcado como completado`);
  },

  editarProducto(productId) {
    alert(`Editando producto ${productId} - Editar producto`);
  },

  desactivarProducto(productId) {
    if (!confirm(`¿Desactivar producto ${productId}?`)) return;
    const row = this.findRowByFirstCellText(productId);
    if (!row) return;
    const statusCell = row.querySelector('td:nth-child(6)');
    if (!statusCell) return;
    statusCell.innerHTML = '<span class="status-badge status-pendiente">Inactivo</span>';
    alert(`Producto ${productId} desactivado`);
  },

  suscribirEmail(email) {
    if (!email) { alert('Por favor, ingresa un email válido'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { alert('Por favor, ingresa un email válido'); return; }
    alert(`Email ${email} suscrito correctamente`);
    const input = document.querySelector('#subscribe-form input[type="email"]');
    if (input) input.value = '';
  },

  buscarEnTabla(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) return;
    input.addEventListener('keyup', function () {
      const filter = this.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => admin.init());
} else {
  admin.init();
}
