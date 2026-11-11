import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import Encabezado from '../components/Encabezado';
import TarjetaSalida from '../components/TarjetaSalida';
import { Cargando, Error, Vacio } from '../components/Mensaje';
import { useSesion } from '../sesion';

// HU_008: buscar salidas por destino, fecha y punto, ordenadas por hora o precio
export default function Buscar() {
  const [parametros, setParametros] = useSearchParams();
  const [destino, setDestino] = useState(parametros.get('destino') || '');
  const [fecha, setFecha] = useState(parametros.get('fecha') || '');
  const [puntoId, setPuntoId] = useState(parametros.get('puntoId') || '');
  const [orden, setOrden] = useState('hora');
  const [puntos, setPuntos] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [salidas, setSalidas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const { comparar } = useSesion();
  const navegar = useNavigate();

  useEffect(() => {
    api('/api/puntos').then(setPuntos).catch(() => {});
    api('/api/rutas/destinos').then(setDestinos).catch(() => {});
  }, []);

  useEffect(() => {
    if (!destino.trim()) return;
    const q = new URLSearchParams({ destino, orden });
    if (fecha) q.set('fecha', fecha);
    if (puntoId) q.set('puntoId', puntoId);
    setCargando(true);
    setError('');
    api(`/api/salidas/buscar?${q}`)
      .then(setSalidas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
    setParametros({ destino, ...(fecha && { fecha }), ...(puntoId && { puntoId }) }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destino, fecha, puntoId, orden]);

  const nombreCorto = (n) => (n.startsWith('Terminal de Transportes') ? 'Terminal de Transportes' : n.replace('Terminal ', ''));

  return (
    <>
      <Encabezado titulo="Buscar salidas" />
      <section className="pagina">
        <div className="fila-form">
          <div className="campo">
            <label>Destino</label>
            <input list="destinos-buscar" value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Ej. Ipiales" />
            <datalist id="destinos-buscar">{destinos.map((d) => <option key={d} value={d} />)}</datalist>
          </div>
          <div className="campo angosto">
            <label>Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
        </div>

        <div className="chips">
          <button className={`chip ${!puntoId ? 'activo' : ''}`} onClick={() => setPuntoId('')}>Todos los puntos</button>
          {puntos.map((p) => (
            <button key={p.id} className={`chip ${puntoId === p.id ? 'activo' : ''}`} onClick={() => setPuntoId(p.id)}>
              {nombreCorto(p.nombre)}
            </button>
          ))}
        </div>

        {salidas && (
          <div className="fila barra-orden">
            <span className="tenue">{salidas.length} salidas</span>
            <div className="chips">
              <button className={`chip ${orden === 'hora' ? 'activo' : ''}`} onClick={() => setOrden('hora')}>Hora</button>
              <button className={`chip ${orden === 'precio' ? 'activo' : ''}`} onClick={() => setOrden('precio')}>Precio</button>
            </div>
          </div>
        )}

        <Error texto={error} />
        {cargando && <Cargando />}
        {!destino && <Vacio titulo="¿A dónde vas?" texto="Escribe un destino para ver horarios, tarifas y desde qué punto sale." />}
        {salidas?.length === 0 && !cargando && (
          <Vacio titulo="No hay salidas para esa búsqueda" texto="Prueba otra fecha u otro punto de transporte." />
        )}
        {salidas?.map((s) => (
          <div key={s.id}>
            {!fecha && <p className="fecha-grupo">{s.fechaHora.slice(0, 10)}</p>}
            <TarjetaSalida salida={s} />
          </div>
        ))}

        {comparar.length >= 2 && (
          <button className="boton ancho flotante" onClick={() => navegar('/comparar')}>
            Comparar ({comparar.length})
          </button>
        )}
      </section>
    </>
  );
}
