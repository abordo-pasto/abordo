export function Error({ texto }) {
  return texto ? <p className="alerta error">{texto}</p> : null;
}

export function Exito({ texto }) {
  return texto ? <p className="alerta exito">{texto}</p> : null;
}

export function Vacio({ titulo, texto }) {
  return (
    <div className="vacio">
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
        <rect x="8" y="12" width="48" height="34" rx="8" fill="#d6e4f3" />
        <rect x="14" y="18" width="36" height="12" rx="3" fill="#1060AA" opacity=".8" />
        <circle cx="20" cy="48" r="6" fill="#4a5568" />
        <circle cx="44" cy="48" r="6" fill="#4a5568" />
      </svg>
      <h3>{titulo}</h3>
      {texto && <p>{texto}</p>}
    </div>
  );
}

export function Cargando() {
  return <p className="cargando">Cargando…</p>;
}
