import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Icono from '../components/Icono';
import { Error, Exito } from '../components/Mensaje';
import { useSesion } from '../sesion';

const ROL = { PASAJERO: 'Pasajero', OPERADOR: 'Operador de empresa', ADMINISTRADOR: 'Administrador' };

const CUENTAS_PRUEBA = [
  ['Pasajero', 'pasajero@abordo.com', 'pasajero123', 'usuario', 'Busca, compara y compra'],
  ['Operador', 'operador@cootranar.com', 'operador123', 'bus', 'Buses, rutas y salidas'],
  ['Admin', 'admin@abordo.com', 'admin123', 'escudo', 'Puntos, empresas y ventas'],
];

// HU_001 Registrarse y HU_002 Iniciar sesión
export default function Cuenta() {
  const { usuario, iniciarSesion, cerrarSesion } = useSesion();
  const [modo, setModo] = useState('login');
  const [datos, setDatos] = useState({ nombre: '', correo: '', contrasena: '', documento: '' });
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      if (modo === 'registro') {
        await api('/api/auth/registro', { metodo: 'POST', cuerpo: datos });
        setAviso('Cuenta creada. Ya puedes comprar tiquetes.');
      }
      const u = await iniciarSesion(datos.correo, datos.contrasena);
      navegar(u.rol === 'OPERADOR' ? '/operador' : u.rol === 'ADMINISTRADOR' ? '/admin' : '/buscar');
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (usuario) {
    return (
      <div className="contenedor pagina" style={{ maxWidth: 640 }}>
        <div className="tarjeta pila" style={{ gap: 'var(--e5)' }}>
          <div className="perfil">
            <span className="avatar">{usuario.nombre[0].toUpperCase()}</span>
            <div className="pila" style={{ gap: 4 }}>
              <h1 style={{ fontSize: '1.4rem' }}>{usuario.nombre}</h1>
              <span className="tenue">{usuario.correo}</span>
              <span className="insignia azul">{ROL[usuario.rol]}{usuario.empresa ? ` · ${usuario.empresa}` : ''}</span>
            </div>
          </div>
          <div className="pila">
            {usuario.rol === 'PASAJERO' && <Link to="/tiquetes" className="boton grande ancho"><Icono nombre="tiquete" /> Mis tiquetes</Link>}
            {usuario.rol === 'OPERADOR' && <Link to="/operador" className="boton grande ancho"><Icono nombre="panel" /> Gestionar mi empresa</Link>}
            {usuario.rol === 'ADMINISTRADOR' && <Link to="/admin" className="boton grande ancho"><Icono nombre="panel" /> Panel de administración</Link>}
            <button className="boton secundario ancho" onClick={cerrarSesion}><Icono nombre="salir" /> Cerrar sesión</button>
          </div>
        </div>
      </div>
    );
  }

  const registro = modo === 'registro';

  return (
    <div className="contenedor pagina">
      <div className="diseno-cuenta">
        <div className="lado-marca">
          <div>
            <p style={{ color: 'var(--acento)', fontWeight: 800, letterSpacing: '.08em', fontSize: '.8rem', marginBottom: 'var(--e3)' }}>
              PUNTOS DE TRANSPORTE DE PASTO
            </p>
            <h2>Tu próximo viaje, sin filas ni adivinanzas.</h2>
          </div>
          <ul>
            <li><Icono nombre="check" /> Horarios y tarifas de las tres terminales en un solo lugar.</li>
            <li><Icono nombre="check" /> Compara salidas y ve cuál es la más barata y la más rápida.</li>
            <li><Icono nombre="check" /> Elige tu asiento y guarda tu tiquete con su código.</li>
          </ul>
        </div>

        <form className="tarjeta form-cuenta" onSubmit={enviar}>
          <div>
            <h1>{registro ? 'Crear cuenta de pasajero' : 'Iniciar sesión'}</h1>
            <p className="tenue">{registro ? 'Solo te toma un minuto.' : 'Entra para comprar tiquetes o gestionar tu empresa.'}</p>
          </div>
          {registro && (
            <div className="rejilla-form dos">
              <div className="campo">
                <label htmlFor="nombre">Nombre completo</label>
                <input id="nombre" value={datos.nombre} onChange={cambiar('nombre')} autoComplete="name" required />
              </div>
              <div className="campo">
                <label htmlFor="documento">Documento</label>
                <input id="documento" value={datos.documento} onChange={cambiar('documento')} inputMode="numeric" required />
              </div>
            </div>
          )}
          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input id="correo" type="email" value={datos.correo} onChange={cambiar('correo')} autoComplete="email" required />
          </div>
          <div className="campo">
            <label htmlFor="contrasena">Contraseña</label>
            <input id="contrasena" type="password" value={datos.contrasena} onChange={cambiar('contrasena')}
              autoComplete={registro ? 'new-password' : 'current-password'} required minLength={registro ? 6 : undefined} />
            {registro && <span className="ayuda">Mínimo 6 caracteres.</span>}
          </div>
          <Error texto={error} />
          <Exito texto={aviso} />
          <button className="boton grande ancho" disabled={enviando}>
            {enviando ? 'Un momento…' : registro ? 'Registrarme' : 'Entrar'}
          </button>
          <button type="button" className="enlace" style={{ alignSelf: 'center' }} onClick={() => { setModo(registro ? 'login' : 'registro'); setError(''); }}>
            {registro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>

          {!registro && (
            <>
              <div className="separador">Cuentas de prueba</div>
              <div className="cuentas-prueba">
                {CUENTAS_PRUEBA.map(([rol, correo, clave, icono, texto]) => (
                  <button key={rol} type="button" className="cuenta-prueba" title={texto} onClick={() => setDatos({ ...datos, correo, contrasena: clave })}>
                    <Icono nombre={icono} /> {rol}
                  </button>
                ))}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
