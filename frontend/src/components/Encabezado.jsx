import { useNavigate } from 'react-router-dom';
import Icono from './Icono';

// Título de página: botón volver opcional, subtítulo y acciones a la derecha
export default function Encabezado({ titulo, subtitulo, atras, children }) {
  const navegar = useNavigate();
  return (
    <div className="encabezado">
      <div className="encabezado-texto">
        {atras && (
          <button className="volver" onClick={() => navegar(-1)}>
            <Icono nombre="izquierda" tam={18} /> Volver
          </button>
        )}
        <h1>{titulo}</h1>
        {subtitulo && <p className="subtitulo">{subtitulo}</p>}
      </div>
      {children && <div className="encabezado-acciones">{children}</div>}
    </div>
  );
}

// Encabezado oscuro de los paneles de operador y administrador
export function CabezaPanel({ antetitulo, titulo, subtitulo }) {
  return (
    <div className="panel-banda">
      <div className="contenedor">
        <p className="antetitulo">{antetitulo}</p>
        <h1>{titulo}</h1>
        {subtitulo && <p className="subtitulo">{subtitulo}</p>}
      </div>
    </div>
  );
}
