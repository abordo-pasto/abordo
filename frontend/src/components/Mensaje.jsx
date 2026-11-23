import Icono from './Icono';

export function Error({ texto }) {
  return texto ? (
    <div className="alerta error" role="alert"><Icono nombre="info" /> <span>{texto}</span></div>
  ) : null;
}

export function Exito({ texto }) {
  return texto ? (
    <div className="alerta exito" role="status"><Icono nombre="check" /> <span>{texto}</span></div>
  ) : null;
}

export function Aviso({ children }) {
  return <div className="alerta"><Icono nombre="info" /> <span>{children}</span></div>;
}

export function Vacio({ titulo, texto, icono = 'bus', children }) {
  return (
    <div className="vacio">
      <span className="vacio-icono"><Icono nombre={icono} tam={32} /></span>
      <h3>{titulo}</h3>
      {texto && <p>{texto}</p>}
      {children}
    </div>
  );
}

// Esqueletos mientras responde el servidor (Render puede tardar al despertar)
export function Cargando({ filas = 3 }) {
  return (
    <div className="cargando" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: filas }, (_, i) => <div key={i} className="esqueleto" />)}
    </div>
  );
}
