import { Link } from 'react-router-dom';
import { colorEmpresa, duracion, hora, pesos, SERVICIO } from '../api';
import { useSesion } from '../sesion';
import Icono from './Icono';

// Una salida en los resultados de búsqueda (HU_008) con su casilla para comparar (HU_015)
export default function TarjetaSalida({ salida }) {
  const { comparar, alternarComparar } = useSesion();
  const marcada = comparar.some((s) => s.id === salida.id);
  const agotada = salida.asientosLibres <= 0;
  const guardar = () => sessionStorage.setItem(`salida.${salida.id}`, JSON.stringify(salida));

  return (
    <article className={`salida ${marcada ? 'marcada' : ''}`}>
      <div className="salida-horario">
        <span className="salida-hora">{hora(salida.fechaHora)}</span>
        <span className="salida-linea">{duracion(salida.duracionMinutos)}</span>
        <span className="salida-hora">{hora(salida.horaEstimadaLlegada)}</span>
      </div>
      <div className="salida-info">
        <span className="salida-empresa">
          <i className="marca-empresa" style={{ background: colorEmpresa(salida.empresa) }} />
          {salida.empresa}
          <span className="insignia azul">{SERVICIO[salida.tipoServicio]}</span>
        </span>
        <span className="salida-meta">
          <span><Icono nombre="edificio" tam={14} /> {salida.puntoTransporte}</span>
          <span className={salida.asientosLibres < 6 ? 'negrita' : ''}>
            <Icono nombre="usuarios" tam={14} /> {agotada ? 'Sin cupos' : `${salida.asientosLibres} de ${salida.capacidad} libres`}
          </span>
        </span>
      </div>
      <div className="salida-precio">
        <span className="tenue pequeño">desde</span>
        <strong>{pesos(salida.precioBase)}</strong>
      </div>
      <div className="salida-acciones">
        <label className="check-comparar">
          <input type="checkbox" checked={marcada} onChange={() => alternarComparar(salida)} /> Comparar
        </label>
        {agotada ? (
          <span className="insignia gris">Agotada</span>
        ) : (
          <Link to={`/salidas/${salida.id}`} className="boton" onClick={guardar}>Ver asientos</Link>
        )}
      </div>
    </article>
  );
}
