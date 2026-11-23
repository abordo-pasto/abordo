import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, colorEmpresa } from '../api';
import Encabezado from '../components/Encabezado';
import Icono from '../components/Icono';
import { Cargando, Error } from '../components/Mensaje';

// HU_014: detalle del punto con sus empresas y destinos
export default function DetallePunto() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/api/puntos/${id}`).then(setDetalle).catch((e) => setError(e.message));
  }, [id]);

  return (
    <div className="contenedor pagina">
      <Encabezado atras titulo={detalle?.punto.nombre || 'Punto de transporte'} subtitulo={detalle?.punto.zonaQueAtiende} />
      <Error texto={error} />
      {!detalle && !error && <Cargando filas={2} />}
      {detalle && (
        <>
          <div className="tarjeta ficha-punto">
            <div className="punto-dato"><span className="etiqueta"><Icono nombre="pin" tam={16} /> Dirección</span><strong>{detalle.punto.direccion}</strong></div>
            <div className="punto-dato"><span className="etiqueta"><Icono nombre="reloj" tam={16} /> Horario</span><strong>{detalle.punto.horarioAtencion}</strong></div>
            <div className="punto-dato"><span className="etiqueta"><Icono nombre="ruta" tam={16} /> Atiende</span><strong>{detalle.punto.zonaQueAtiende || '—'}</strong></div>
          </div>

          <section className="seccion">
            <div className="seccion-titulo"><h2>Empresas que salen de aquí</h2></div>
            <div className="chips">
              {detalle.empresas.length ? detalle.empresas.map((e) => (
                <span key={e} className="chip"><i className="marca-empresa" style={{ background: colorEmpresa(e) }} /> {e}</span>
              )) : <p className="tenue">Sin empresas registradas.</p>}
            </div>
          </section>

          <section className="seccion">
            <div className="seccion-titulo"><h2>Destinos</h2><p>Toca uno para ver sus salidas.</p></div>
            <div className="destinos">
              {detalle.destinos.map((d) => (
                <Link key={d} to={`/buscar?destino=${encodeURIComponent(d)}&puntoId=${detalle.punto.id}`} className="tarjeta compacta destino">
                  <span>{d}</span>
                  <Icono nombre="derecha" tam={18} />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
