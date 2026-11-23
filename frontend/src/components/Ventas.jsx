import { useEffect, useState } from 'react';
import { api, colorEmpresa, hoyISO, pesos } from '../api';
import { Cargando, Error, Vacio } from './Mensaje';

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

  const maximo = Math.max(1, ...(reporte?.lineas.map((l) => l.totalRecaudado) || [0]));

  return (
    <div>
      <div className="gestion-cabeza">
        <div>
          <h2>Reporte de ventas</h2>
          <p className="tenue pequeño">Tiquetes vendidos y valor recaudado en el rango de fechas.</p>
        </div>
      </div>
      <div className="tarjeta compacta rejilla-form dos">
        <div className="campo"><label htmlFor="ventas-desde">Desde</label><input id="ventas-desde" type="date" value={desde} onChange={(e) => setDesde(e.target.value)} /></div>
        <div className="campo"><label htmlFor="ventas-hasta">Hasta</label><input id="ventas-hasta" type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} /></div>
      </div>
      <Error texto={error} />
      {!reporte && !error && <Cargando filas={2} />}
      {reporte && (
        <>
          <div className="kpis">
            <div className="tarjeta compacta kpi"><span>Tiquetes vendidos</span><strong>{reporte.totalTiquetes}</strong></div>
            <div className="tarjeta compacta kpi"><span>Total recaudado</span><strong>{pesos(reporte.totalRecaudado)}</strong></div>
          </div>
          {reporte.lineas.length === 0 ? (
            <div className="tarjeta"><Vacio icono="grafico" titulo="No hay ventas en ese rango" texto="Cambia las fechas para ver otro periodo." /></div>
          ) : (
            <div className="tarjeta barras-ventas">
              <h3>Por empresa</h3>
              {reporte.lineas.map((l) => (
                <div key={l.empresa} className="barra-venta">
                  <div className="fila">
                    <strong>{l.empresa} <span>· {l.cantidadTiquetes} {l.cantidadTiquetes === 1 ? 'tiquete' : 'tiquetes'}</span></strong>
                    <strong>{pesos(l.totalRecaudado)}</strong>
                  </div>
                  <div className="barra-pista">
                    <div className="barra-relleno" style={{ width: `${(l.totalRecaudado / maximo) * 100}%`, background: colorEmpresa(l.empresa) }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
