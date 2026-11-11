import { Link } from 'react-router-dom';
import { hora, pesos, SERVICIO } from '../api';
import { useSesion } from '../sesion';

export default function TarjetaSalida({ salida }) {
  const { comparar, alternarComparar } = useSesion();
  const marcada = comparar.some((s) => s.id === salida.id);
  return (
    <div className="tarjeta salida">
      <Link to={`/salidas/${salida.id}`} className="salida-datos" onClick={() => sessionStorage.setItem(`salida.${salida.id}`, JSON.stringify(salida))}>
        <div className="fila">
          <strong>{hora(salida.fechaHora)} → {hora(salida.horaEstimadaLlegada)}</strong>
          <strong>{pesos(salida.precioBase)}</strong>
        </div>
        <div className="fila tenue">
          <span>{salida.empresa} · {SERVICIO[salida.tipoServicio]}</span>
          <span>{salida.asientosLibres} libres</span>
        </div>
      </Link>
      <div className="fila">
        <span className="tenue">{salida.puntoTransporte}</span>
        <label className="check-comparar">
          <input type="checkbox" checked={marcada} onChange={() => alternarComparar(salida)} /> Comparar
        </label>
      </div>
    </div>
  );
}
