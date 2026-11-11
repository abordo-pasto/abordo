import { NavLink } from 'react-router-dom';
import { useSesion } from '../sesion';

const iconos = {
  inicio: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  buscar: 'M10.5 4a6.5 6.5 0 1 0 4 11.6l4.4 4.4M10.5 4a6.5 6.5 0 0 1 0 13',
  comparar: 'M12 3v18M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z',
  tiquetes: 'M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM14 7v10',
  cuenta: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 8a8 8 0 0 1 16 0',
  panel: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
};

function Icono({ d }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d={d} />
    </svg>
  );
}

export default function BarraInferior() {
  const { usuario, comparar } = useSesion();
  const enlaces = [
    { a: '/', texto: 'Inicio', icono: iconos.inicio },
    { a: '/buscar', texto: 'Buscar', icono: iconos.buscar },
    { a: '/comparar', texto: comparar.length ? `Comparar (${comparar.length})` : 'Comparar', icono: iconos.comparar },
  ];
  if (usuario?.rol === 'OPERADOR') enlaces.push({ a: '/operador', texto: 'Mi empresa', icono: iconos.panel });
  else if (usuario?.rol === 'ADMINISTRADOR') enlaces.push({ a: '/admin', texto: 'Admin', icono: iconos.panel });
  else enlaces.push({ a: '/tiquetes', texto: 'Tiquetes', icono: iconos.tiquetes });
  enlaces.push({ a: '/cuenta', texto: 'Cuenta', icono: iconos.cuenta });

  return (
    <nav className="barra-inferior">
      {enlaces.map((e) => (
        <NavLink key={e.a} to={e.a} end={e.a === '/'} className={({ isActive }) => (isActive ? 'activo' : '')}>
          <Icono d={e.icono} />
          <span>{e.texto}</span>
        </NavLink>
      ))}
    </nav>
  );
}
