import { Link, NavLink } from 'react-router-dom';
import { useSesion } from '../sesion';
import Icono, { Logo } from './Icono';

const ROL_CORTO = { PASAJERO: 'Pasajero', OPERADOR: 'Operador', ADMINISTRADOR: 'Administrador' };

// Enlaces según el rol: el pasajero ve sus tiquetes, el operador su empresa y el admin su panel
function useEnlaces() {
  const { usuario, comparar } = useSesion();
  const enlaces = [
    { a: '/', texto: 'Inicio', icono: 'inicio' },
    { a: '/buscar', texto: 'Buscar', icono: 'buscar' },
    { a: '/comparar', texto: 'Comparar', icono: 'comparar', cuenta: comparar.length },
  ];
  if (usuario?.rol === 'OPERADOR') enlaces.push({ a: '/operador', texto: 'Mi empresa', icono: 'panel' });
  else if (usuario?.rol === 'ADMINISTRADOR') enlaces.push({ a: '/admin', texto: 'Administración', corto: 'Admin', icono: 'panel' });
  else enlaces.push({ a: '/tiquetes', texto: 'Mis tiquetes', corto: 'Tiquetes', icono: 'tiquete' });
  return enlaces;
}

const clase = ({ isActive }) => (isActive ? 'activo' : '');

export function BarraSuperior() {
  const { usuario } = useSesion();
  const enlaces = useEnlaces();
  return (
    <header className="barra-superior">
      <div className="contenedor barra-superior-interior">
        <Link to="/" className="marca" aria-label="Abordo, inicio">
          <Logo />
          <span>Abordo</span>
        </Link>
        <nav className="nav-escritorio" aria-label="Principal">
          {enlaces.map((e) => (
            <NavLink key={e.a} to={e.a} end={e.a === '/'} className={clase}>
              {e.texto}
              {e.cuenta > 0 && <span className="contador">{e.cuenta}</span>}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/cuenta" className={({ isActive }) => `chip-usuario ${isActive ? 'activo' : ''}`}>
          {usuario ? (
            <>
              <span className="avatar">{usuario.nombre?.[0]?.toUpperCase()}</span>
              <span className="chip-usuario-texto">
                <strong>{usuario.nombre?.split(' ')[0]}</strong>
                <small>{ROL_CORTO[usuario.rol]}</small>
              </span>
            </>
          ) : (
            <>
              <Icono nombre="usuario" />
              <span className="chip-usuario-texto"><strong>Ingresar</strong></span>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
}

export function BarraInferior() {
  const enlaces = [...useEnlaces(), { a: '/cuenta', texto: 'Cuenta', icono: 'usuario' }];
  return (
    <nav className="barra-inferior" aria-label="Principal">
      {enlaces.map((e) => (
        <NavLink key={e.a} to={e.a} end={e.a === '/'} className={clase}>
          <span className="barra-inferior-icono">
            <Icono nombre={e.icono} tam={22} />
            {e.cuenta > 0 && <span className="contador">{e.cuenta}</span>}
          </span>
          <span>{e.corto || e.texto}</span>
        </NavLink>
      ))}
    </nav>
  );
}
