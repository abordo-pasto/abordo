// Iconos de línea de una sola familia (24x24, trazo 1.8)
const TRAZOS = {
  inicio: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  buscar: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  comparar: 'M4 5h6v14H4zM14 5h6v14h-6z',
  tiquete: 'M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4zM14 6v2.5M14 10.75v2.5M14 15.5V18',
  usuario: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  panel: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  bus: 'M5 17V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v11zM5 11h14M8 14h.01M16 14h.01M7 17v2.5M17 17v2.5M9 6h6',
  pin: 'M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  reloj: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  calendario: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  derecha: 'M5 12h14M13 6l6 6-6 6',
  izquierda: 'M19 12H5M11 6l-6 6 6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  cerrar: 'M6 6l12 12M18 6 6 18',
  tarjeta: 'M3 6h18v12H3zM3 10h18M7 15h4',
  salir: 'M9 4H5v16h4M14 8l4 4-4 4M18 12H9',
  mas: 'M12 5v14M5 12h14',
  editar: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  borrar: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  orden: 'M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  grafico: 'M5 20V11M11 20V5M17 20v-6M3 20h18',
  ruta: 'M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16V10a4 4 0 0 1 4-4h6M18 8v6a4 4 0 0 1-4 4H8',
  edificio: 'M4 21V5l8-3 8 3v16M2 21h20M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4',
  usuarios: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4.5-6.5',
  rayo: 'M13 2 4 14h7l-1 8 9-12h-7z',
  etiqueta: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
  filtro: 'M4 6h16M7 12h10M10 18h4',
  escudo: 'M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6zM9 12l2 2 4-4',
  volante: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM3.5 11h6.5M14 11h6.5M12 14v7',
};

export default function Icono({ nombre, tam = 20, className = '' }) {
  return (
    <svg className={`icono ${className}`} viewBox="0 0 24 24" width={tam} height={tam} fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d={TRAZOS[nombre]} />
    </svg>
  );
}

export function Logo({ tam = 34 }) {
  return (
    <svg viewBox="0 0 40 40" width={tam} height={tam} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--primario)" />
      <path d="M12 27V14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v13z" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M12 20h16" stroke="#fff" strokeWidth="2.4" />
      <circle cx="16" cy="24" r="1.4" fill="#fff" />
      <circle cx="24" cy="24" r="1.4" fill="#fff" />
      <circle cx="31" cy="9" r="4" fill="var(--acento)" />
    </svg>
  );
}
