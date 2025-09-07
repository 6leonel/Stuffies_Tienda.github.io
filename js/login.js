document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  if (!form) return;

  const showMsg = (text) => {
    const box = document.getElementById('msg');
    if (box) {
      box.className = 'alert alert-danger mt-3';
      box.textContent = text;
      box.classList.remove('d-none');
    } else {
      alert(text);
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('email')?.value || '').trim();
    const password = (document.getElementById('password')?.value || '').trim();

    if (!email || !password) {
      showMsg('Por favor, completa todos los campos');
      return;
    }

    if (
      (email === 'admin' && password === 'admin') ||
      (email === 'admin@stuffies.cl' && password === 'admin123')
    ) {
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

    const userSession = {
      user: email,
      name: (email.split('@')[0] || 'Usuario'),
      role: 'user',
      avatar: 'https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png'
    };
    localStorage.setItem('stuffies_session', JSON.stringify(userSession));
    window.location.href = 'Tienda_Stuffiess.html';
  });
});
