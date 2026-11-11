import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Encabezado from '../components/Encabezado';
import { Error, Exito } from '../components/Mensaje';
import { useSesion } from '../sesion';

const ROL = { PASAJERO: 'Pasajero', OPERADOR: 'Operador de empresa', ADMINISTRADOR: 'Administrador' };

const CUENTAS_PRUEBA = [
  ['Pasajero', 'pasajero@abordo.com', 'pasajero123'],
  ['Operador', 'operador@cootranar.com', 'operador123'],
  ['Admin', 'admin@abordo.com', 'admin123'],
];

// HU_001 Registrarse y HU_002 Iniciar sesión
export default function Cuenta() {
  const { usuario, iniciarSesion, cerrarSesion } = useSesion();
  const [modo, setModo] = useState('login');
  const [datos, setDatos] = useState({ nombre: '', correo: '', contrasena: '', documento: '' });
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const navegar = useNavigate();
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setError('');
    try {
      if (modo === 'registro') {
        await api('/api/auth/registro', { metodo: 'POST', cuerpo: datos });
        setAviso('Cuenta creada. Ya puedes comprar tiquetes.');
      }
      const u = await iniciarSesion(datos.correo, datos.contrasena);
      navegar(u.rol === 'OPERADOR' ? '/operador' : u.rol === 'ADMINISTRADOR' ? '/admin' : '/buscar');
    } catch (err) {
      setError(err.message);
    }
  }

  if (usuario) {
    return (
      <>
        <Encabezado titulo="Mi cuenta" />
        <section className="pagina">
          <div className="tarjeta">
            <strong>{usuario.nombre}</strong>
            <span className="tenue">{usuario.correo}</span>
            <span className="insignia azul">{ROL[usuario.rol]}{usuario.empresa ? ` · ${usuario.empresa}` : ''}</span>
          </div>
          {usuario.rol === 'PASAJERO' && <Link to="/tiquetes" className="boton ancho">Mis tiquetes</Link>}
          {usuario.rol === 'OPERADOR' && <Link to="/operador" className="boton ancho">Gestionar mi empresa</Link>}
          {usuario.rol === 'ADMINISTRADOR' && <Link to="/admin" className="boton ancho">Panel de administración</Link>}
          <button className="boton ancho secundario" onClick={cerrarSesion}>Cerrar sesión</button>
        </section>
      </>
    );
  }

  return (
    <>
      <Encabezado titulo={modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'} />
      <section className="pagina">
        <form className="tarjeta" onSubmit={enviar}>
          {modo === 'registro' && (
            <>
              <label>Nombre completo</label>
              <input value={datos.nombre} onChange={cambiar('nombre')} required />
              <label>Documento</label>
              <input value={datos.documento} onChange={cambiar('documento')} required />
            </>
          )}
          <label>Correo</label>
          <input type="email" value={datos.correo} onChange={cambiar('correo')} required />
          <label>Contraseña</label>
          <input type="password" value={datos.contrasena} onChange={cambiar('contrasena')} required minLength={modo === 'registro' ? 6 : undefined} />
          <Error texto={error} />
          <Exito texto={aviso} />
          <button className="boton ancho">{modo === 'login' ? 'Entrar' : 'Registrarme'}</button>
          <button type="button" className="enlace centro" onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setError(''); }}>
            {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </form>

        {modo === 'login' && (
          <div className="tarjeta">
            <span className="tenue pequeño">Cuentas de prueba</span>
            <div className="chips">
              {CUENTAS_PRUEBA.map(([rol, correo, clave]) => (
                <button key={rol} type="button" className="chip" onClick={() => setDatos({ ...datos, correo, contrasena: clave })}>{rol}</button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
