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
    // js/login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('email')?.value || '').trim();
    const password = (document.getElementById('password')?.value || '').trim();

    // --- Admin demo ---
    if (email === 'admin@stuffies.cl' && password === 'admin123') {
      const adminSession = {
        user: email,
        name: 'Admin Stuffies',
        role: 'admin',
        avatar: 'https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png'
      };
      localStorage.setItem('stuffies_session', JSON.stringify(adminSession));
      window.location.href = 'admin.html';
      return;
    }

    // --- Usuario normal (ajusta a tu validación real) ---
    // Ejemplo base: cualquier otro login válido entra como 'user'
    const userSession = {
      user: email,
      name: email.split('@')[0] || 'Usuario',
      role: 'user',
      avatar: 'https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png'
    };
    localStorage.setItem('stuffies_session', JSON.stringify(userSession));
    window.location.href = 'Tienda_Stuffiess.html';
  });
});

});