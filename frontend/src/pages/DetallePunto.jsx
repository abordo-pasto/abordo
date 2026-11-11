import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import Encabezado from '../components/Encabezado';
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
    <>
      <Encabezado titulo={detalle?.punto.nombre || 'Punto de transporte'} atras />
      <section className="pagina">
        <Error texto={error} />
        {!detalle && !error && <Cargando />}
        {detalle && (
          <>
            <div className="tarjeta">
              <p><span className="tenue">Dirección</span><br />{detalle.punto.direccion}</p>
              <p><span className="tenue">Horario</span><br />{detalle.punto.horarioAtencion}</p>
              <p><span className="tenue">Atiende</span><br />{detalle.punto.zonaQueAtiende}</p>
            </div>
            <h2>Empresas</h2>
            <div className="chips">
              {detalle.empresas.length ? detalle.empresas.map((e) => <span key={e} className="chip">{e}</span>) : <p className="tenue">Sin empresas registradas.</p>}
            </div>
            <h2>Destinos</h2>
            {detalle.destinos.map((d) => (
              <Link key={d} to={`/buscar?destino=${encodeURIComponent(d)}&puntoId=${detalle.punto.id}`} className="tarjeta fila">
                <span>{d}</span>
                <span className="enlace">Ver salidas →</span>
              </Link>
            ))}
          </>
        )}
      </section>
    </>
  );
}
