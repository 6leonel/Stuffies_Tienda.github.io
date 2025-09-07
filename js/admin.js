// admin.js - Funciones para el panel de administración de STUFFIES

// Objeto principal para organizar todas las funciones
const admin = {
    // Inicialización
    init: function() {
        this.setupNavigation();
        this.setupEventListeners();
        console.log('Panel de administración inicializado');
    },
    
    // Configuración de navegación entre secciones
    setupNavigation: function() {
        const navButtons = document.querySelectorAll('.admin-nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                admin.showSection(targetSection);
            });
        });
    },
    
    // Mostrar sección específica
    showSection: function(sectionId) {
        // Actualizar botones activos
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            }
        });
        
        // Mostrar sección correspondiente
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    },
    
    // Configurar event listeners para botones
    setupEventListeners: function() {
        // Event delegation para botones de acciones
        document.addEventListener('click', function(e) {
            // Botones de completar pedido
            if (e.target.classList.contains('btn-completar')) {
                const orderId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.marcarCompletado(orderId);
            }
            
            // Botones de marcar como enviado
            if (e.target.classList.contains('btn-enviar')) {
                const orderId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.marcarEnviado(orderId);
            }
            
            // Botones de editar producto
            if (e.target.classList.contains('btn-editar')) {
                const productId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.editarProducto(productId);
            }
            
            // Botones de desactivar producto
            if (e.target.classList.contains('btn-desactivar')) {
                const productId = e.target.closest('tr').querySelector('td:first-child').textContent;
                admin.desactivarProducto(productId);
            }
        });
        
        // Formulario de suscripción
        const subscribeForm = document.getElementById('subscribe-form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                admin.suscribirEmail(this.querySelector('input[type="email"]').value);
            });
        }
    },
    
    // Funciones para pedidos
    marcarEnviado: function(orderId) {
        if (confirm(`¿Marcar pedido ${orderId} como enviado?`)) {
            // Cambiar estado en la UI
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${orderId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-enviado">Enviado</span>';
                
                // Cambiar botones
                const actionCell = statusCell.nextElementSibling;
                actionCell.innerHTML = '<button class="btn btn-success btn-action btn-completar">Completar</button>';
                
                alert(`Pedido ${orderId} marcado como enviado`);
            }
        }
    },
    
    marcarCompletado: function(orderId) {
        if (confirm(`¿Marcar pedido ${orderId} como completado?`)) {
            // Cambiar estado en la UI
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${orderId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-completado">Completado</span>';
                
                // Cambiar botones
                const actionCell = statusCell.nextElementSibling;
                actionCell.innerHTML = '<button class="btn btn-primary btn-action">Ver</button>';
                
                alert(`Pedido ${orderId} marcado como completado`);
            }
        }
    },
    
    // Funciones para productos
    editarProducto: function(productId) {
        alert(`Editando producto ${productId} - Editar producto`);
        // Aquí iría la lógica para abrir un modal o formulario de edición
    },
    
    desactivarProducto: function(productId) {
        if (confirm(`¿Desactivar producto ${productId}?`)) {
            // Cambiar estado en la UI
            const statusCell = document.querySelector(`tr:has(td:first-child:contains("${productId}")) td:nth-child(6)`);
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-pendiente">Inactivo</span>';
                alert(`Producto ${productId} desactivado`);
            }
        }
    },
    
    // Función para suscripción
    suscribirEmail: function(email) {
        if (!email) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        // Validación simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        alert(`Email ${email} suscrito correctamente`);
        document.querySelector('#subscribe-form input[type="email"]').value = '';
    },
    
    // Función para buscar en tablas
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

// Inicializar cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        admin.init();
    });
} else {
    admin.init();
}