// Validaciones para formularios
document.addEventListener('DOMContentLoaded', function() {
    // Validación formulario de registro
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', validarRegistro);
        setupValidacionEnTiempoReal(registroForm);
    }

    // Validación formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validarLogin);
        setupValidacionEnTiempoReal(loginForm);
    }

    // Validación formulario de contacto
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', validarContacto);
        setupValidacionEnTiempoReal(contactoForm);
    }
});

// Configurar validación en tiempo real para todos los campos
function setupValidacionEnTiempoReal(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        input.addEventListener('input', function() {
            limpiarError(this);
        });
    });
}

// Validar campo individual
function validarCampo(campo) {
    const valor = campo.value.trim();
    const nombre = campo.name;
    
    // Limpiar error previo
    limpiarError(campo);
    
    // Validaciones según el tipo de campo
    if (campo.required && !valor) {
        mostrarError(campo, 'Este campo es requerido');
        return false;
    }
    
    switch(nombre) {
        case 'run':
            if (!validarRUN(valor)) {
                mostrarError(campo, 'El RUN ingresado no es válido');
                return false;
            }
            break;
            
        case 'email':
            if (!validarEmail(valor)) {
                mostrarError(campo, 'Ingrese un email válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)');
                return false;
            }
            break;
            
        case 'password':
            if (valor.length < 4 || valor.length > 10) {
                mostrarError(campo, 'La contraseña debe tener entre 4 y 10 caracteres');
                return false;
            }
            break;
            
        case 'nombre':
        case 'apellidos':
            if (valor.length > 100) {
                mostrarError(campo, 'Este campo no puede exceder los 100 caracteres');
                return false;
            }
            break;
            
        case 'comentario':
            if (valor.length > 500) {
                mostrarError(campo, 'El comentario no puede exceder los 500 caracteres');
                return false;
            }
            break;
    }
    
    return true;
}

// Mostrar error en un campo
function mostrarError(campo, mensaje) {
    campo.classList.add('error');
    
    let errorDiv = campo.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        campo.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
}

// Limpiar error de un campo
function limpiarError(campo) {
    campo.classList.remove('error');
    
    const errorDiv = campo.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Validar formulario de registro completo
function validarRegistro(e) {
    e.preventDefault();
    
    const form = e.target;
    const campos = form.querySelectorAll('input, select');
    let esValido = true;
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            esValido = false;
        }
    });
    
    if (esValido) {
        alert('¡Registro exitoso!');
        form.reset();
        // Aquí normalmente se enviarían los datos al servidor
    }
}

// Validar formulario de login
function validarLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let esValido = true;
    
    if (!validarCampo(email)) esValido = false;
    if (!validarCampo(password)) esValido = false;
    
    if (esValido) {
        alert('¡Inicio de sesión exitoso!');
        // Aquí normalmente se enviarían los datos al servidor
        window.location.href = 'index.html';
    }
}

// Validar formulario de contacto
function validarContacto(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const comentario = document.getElementById('comentario');
    let esValido = true;
    
    if (!validarCampo(nombre)) esValido = false;
    if (email.value && !validarCampo(email)) esValido = false;
    if (!validarCampo(comentario)) esValido = false;
    
    if (esValido) {
        alert('¡Mensaje enviado correctamente!');
        e.target.reset();
        // Aquí normalmente se enviarían los datos al servidor
    }
}

// Validar formato de RUN chileno
function validarRUN(run) {
    run = run.replace(/[\.\-]/g, '');
    
    if (run.length < 7 || run.length > 9) return false;
    
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    
    // Calcular DV esperado
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dvCalculado === dv;
}

// Validar formato de email con dominios específicos
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return false;
    
    const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    const dominio = email.split('@')[1];
    
    return dominiosPermitidos.includes(dominio);
}