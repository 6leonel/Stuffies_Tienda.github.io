const admin = {
    // Inicialización
    init: function() {
        this.setupNavigation();
        this.setupEventListeners();
        console.log('Panel de administración inicializado');
    },
    setupNavigation: function() {
        const navButtons = document.querySelectorAll('.admin-nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                admin.showSection(targetSection);
            });
        });
    },
    
    showSection: function(sectionId) {
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    },
    
    setupEventListeners: function() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-completar')) {
                const orderId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.marcarCompletado(orderId);
            }

            if (e.target.classList.contains('btn-enviar')) {
                const orderId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.marcarEnviado(orderId);
            }

            if (e.target.classList.contains('btn-editar')) {
                const productId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.editarProducto(productId);
            }
            if (e.target.classList.contains('btn-desactivar')) {
                const productId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.desactivarProducto(productId);
            }
        });

        const subscribeForm = document.getElementById('subscribe-form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                admin.suscribirEmail(this.querySelector('input[type="email"]').value);
            });
        }
    },
    
    marcarEnviado: function(orderId) {
        if (confirm(`¿Marcar pedido ${orderId} como enviado?`)) {
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${orderId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-enviado">Enviado</span>'; 
                const actionCell = statusCell.nextElementSibling;
                actionCell.innerHTML = '<button class="btn btn-success btn-action btn-completar">Completar</button>';
                
                alert(`Pedido ${orderId} marcado como enviado`);
            }
        }
    },
    
    marcarCompletado: function(orderId) {
        if (confirm(`¿Marcar pedido ${orderId} como completado?`)) {
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${orderId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-completado">Completado</span>';
                const actionCell = statusCell.nextElementSibling;
                actionCell.innerHTML = '<button class="btn btn-primary btn-action">Ver</button>';
                
                alert(`Pedido ${orderId} marcado como completado`);
            }
        }
    },
    
    editarProducto: function(productId) {
        alert(`Editando producto ${productId} - Editar producto`);
    },
    
    desactivarProducto: function(productId) {
        if (confirm(`¿Desactivar producto ${productId}?`)) {
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${productId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-pendiente">Inactivo</span>';
                alert(`Producto ${productId} desactivado`);
            }
        }
    },

    suscribirEmail: function(email) {
        if (!email) {
            alert('Por favor, ingresa un email válido');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        alert(`Email ${email} suscrito correctamente`);
        document.querySelector('#subscribe-form input[type="email"]').value = '';
    },

    buscarEnTabla: function(inputId, tableId) {
        const input = document.getElementById(inputId);
        const table = document.getElementById(tableId);
        
        if (!input || !table) return;
        
        input.addEventListener('keyup', function() {
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
    document.addEventListener('DOMContentLoaded', function() {
        admin.init();
    });
} else {
    admin.init();
}