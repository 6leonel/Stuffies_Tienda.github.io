/* ======= validaciones.js ======= */
window.setError = (el, msg) => {
  const help = el.closest('.form-group, .mb-3, div')?.querySelector('.invalid-feedback')
            || el.parentElement.querySelector('.invalid-feedback');
  el.classList.add('is-invalid');
  if (help) help.textContent = msg || 'Campo inválido';
};
window.clearError = (el) => el.classList.remove('is-invalid');

const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

function validarDominioCorreo(value) {
  if (!value) return { ok:false, msg:'Correo requerido' };
  if (value.length > 100) return { ok:false, msg:'Máx. 100 caracteres' };
  const m = value.toLowerCase().match(/^[^@\s]+@([^@\s]+)$/);
  if (!m) return { ok:false, msg:'Formato de correo inválido' };
  if (!dominiosPermitidos.includes(m[1])) {
    return { ok:false, msg:`Solo ${dominiosPermitidos.join(', ')}` };
  }
  return { ok:true };
}

function validarPassword(value) {
  if (!value) return { ok:false, msg:'Contraseña requerida' };
  if (value.length < 4 || value.length > 10) {
    return { ok:false, msg:'Entre 4 y 10 caracteres' };
  }
  return { ok:true };
}

function validarRUN(run) {
  if (!run) return { ok:false, msg:'RUN requerido' };
  const limpio = run.toUpperCase().replace(/\./g,'').replace(/-/g,'');
  if (limpio.length < 7 || limpio.length > 9) return { ok:false, msg:'RUN entre 7 y 9 caracteres' };
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return { ok:false, msg:'RUN debe ser numérico' };
  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i],10) * mul;
    mul = (mul === 7) ? 2 : mul + 1;
  }
  const res = 11 - (suma % 11);
  const dvCalc = (res === 11) ? '0' : (res === 10 ? 'K' : String(res));
  if (dvCalc !== dv) return { ok:false, msg:'RUN inválido' };
  return { ok:true };
}

function requeridoMax(value, max, nombre='Campo') {
  if (!value) return { ok:false, msg:`${nombre} requerido` };
  if (max && value.length > max) return { ok:false, msg:`Máx. ${max} caracteres` };
  return { ok:true };
}

/* ====== Enlazadores ====== */
function wireLoginForm(formSel='#loginForm') {
  const form = document.querySelector(formSel);
  if (!form) return;
  const idField = form.querySelector('#email');
  const pass = form.querySelector('#password');

  form.addEventListener('submit', (e) => {
    let ok = true;
    clearError(idField); clearError(pass);

    const val = idField.value.trim();
    if (!val) { setError(idField, 'Usuario o correo requerido'); ok=false; }
    else if (val.includes('@')) {
      const v1 = validarDominioCorreo(val);
      if (!v1.ok) { setError(idField, v1.msg); ok=false; }
    }

    const v2 = validarPassword(pass.value.trim());
    if (!v2.ok) { setError(pass, v2.msg); ok=false; }
    if (!ok) e.preventDefault();
  });
}

function wireRegistroForm(formSel='#registerForm') {
  const form = document.querySelector(formSel);
  if (!form) return;
  const run = form.querySelector('#regRun');
  const nombre = form.querySelector('#regName');
  const apellidos = form.querySelector('#regLast');
  const correo = form.querySelector('#regEmail');
  const user = form.querySelector('#regUser');
  const pass = form.querySelector('#regPass');
  const pass2 = form.querySelector('#regPass2');
  const dir = form.querySelector('#regAddress');
  const role = form.querySelector('#regRole');

  form.addEventListener('submit', (e) => {
    let ok = true;
    [run,nombre,apellidos,correo,user,pass,pass2,dir,role].filter(Boolean).forEach(clearError);

    const vRun = validarRUN(run.value.trim()); if (!vRun.ok) { setError(run, vRun.msg); ok=false; }
    const vNom = requeridoMax(nombre.value.trim(), 50, 'Nombre'); if (!vNom.ok){ setError(nombre, vNom.msg); ok=false; }
    const vApe = requeridoMax(apellidos.value.trim(), 100, 'Apellidos'); if (!vApe.ok){ setError(apellidos, vApe.msg); ok=false; }
    const vCor = validarDominioCorreo(correo.value.trim()); if (!vCor.ok){ setError(correo, vCor.msg); ok=false; }
    const vUser = requeridoMax(user.value.trim(), 30, 'Usuario'); if (!vUser.ok){ setError(user, vUser.msg); ok=false; }
    const vPass = validarPassword(pass.value.trim()); if (!vPass.ok){ setError(pass, vPass.msg); ok=false; }
    if (pass2.value !== pass.value) { setError(pass2, 'Las contraseñas no coinciden'); ok=false; }
    const vDir = requeridoMax(dir.value.trim(), 300, 'Dirección'); if (!vDir.ok){ setError(dir, vDir.msg); ok=false; }
    if (!role.value) { setError(role, 'Seleccione un rol'); ok=false; }

    if (!ok) e.preventDefault();
  });
}

function wireContactoForm(formSel='#formContacto') {
  const form = document.querySelector(formSel);
  if (!form) return;
  const nombre = form.querySelector('#conNombre');
  const correo = form.querySelector('#conCorreo');
  const comentario = form.querySelector('#conComentario');

  form.addEventListener('submit', (e) => {
    let ok = true;
    [nombre, correo, comentario].forEach(clearError);

    const vNom = requeridoMax(nombre.value.trim(), 100, 'Nombre'); if (!vNom.ok) { setError(nombre, vNom.msg); ok=false; }
    if (correo.value.trim()) {
      const vCor = validarDominioCorreo(correo.value.trim());
      if (!vCor.ok) { setError(correo, vCor.msg); ok=false; }
    }
    const vCom = requeridoMax(comentario.value.trim(), 500, 'Comentario'); 
    if (!vCom.ok) { setError(comentario, vCom.msg); ok=false; }

    if (!ok) e.preventDefault();
  });
}

window.Validaciones = { wireLoginForm, wireRegistroForm, wireContactoForm };
