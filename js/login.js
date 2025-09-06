// login.js - Lógica de validación para el formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validación básica
            if (!email || !password) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            // Credenciales de administrador
            if (email === 'admin' && password === 'admin') {
                window.location.href = 'admin.html';
                return;
            }
            
            // Aquí iría la lógica de autenticación para usuarios normales
            // Por ahora, redirigimos a la página principal
            window.location.href = 'Tienda_Stuffiess.html';
        });z
    }
});