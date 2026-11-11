import { useEffect, useState } from 'react';
import { api, hoyISO, pesos } from '../api';
import { Error } from './Mensaje';

// HU_007: tiquetes vendidos y valor recaudado por empresa
export default function Ventas() {
  const primerDiaMes = hoyISO().slice(0, 8) + '01';
  const [desde, setDesde] = useState(primerDiaMes);
  const [hasta, setHasta] = useState(hoyISO());
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    api(`/api/reportes/ventas?desde=${desde}&hasta=${hasta}`).then(setReporte).catch((e) => setError(e.message));
  }, [desde, hasta]);

  return (
    <div>
      <div className="fila-form">
        <div className="campo"><label>Desde</label><input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} /></div>
        <div className="campo"><label>Hasta</label><input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} /></div>
      </div>
      <Error texto={error} />
      {reporte && (
        <>
          <div className="resumen">
            <div className="tarjeta"><span className="tenue">Tiquetes</span><strong className="grande">{reporte.totalTiquetes}</strong></div>
            <div className="tarjeta"><span className="tenue">Recaudado</span><strong className="grande">{pesos(reporte.totalRecaudado)}</strong></div>
          </div>
          {reporte.lineas.length === 0 && <p className="tenue centro">No hay ventas en ese rango.</p>}
          {reporte.lineas.map((l) => (
            <div key={l.empresa} className="tarjeta fila">
              <span><strong>{l.empresa}</strong><br /><span className="tenue">{l.cantidadTiquetes} tiquetes</span></span>
              <strong>{pesos(l.totalRecaudado)}</strong>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
