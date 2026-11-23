import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api, fechaLarga } from '../api';
import Encabezado from '../components/Encabezado';
import Icono from '../components/Icono';
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
  const { comparar, setComparar } = useSesion();
  const navegar = useNavigate();

  useEffect(() => {
    api('/api/puntos').then(setPuntos).catch(() => {});
    api('/api/rutas/destinos').then(setDestinos).catch(() => {});
  }, []);

  useEffect(() => {
    if (!destino.trim()) { setSalidas(null); return; }
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

  // Agrupa por día para no repetir la fecha en cada tarjeta
  const dias = [];
  salidas?.forEach((s) => {
    const dia = s.fechaHora.slice(0, 10);
    const grupo = dias.find((d) => d.dia === dia);
    if (grupo) grupo.salidas.push(s);
    else dias.push({ dia, salidas: [s] });
  });
  if (orden === 'precio') dias.sort((a, b) => a.dia.localeCompare(b.dia));

  return (
    <div className="contenedor pagina">
      <Encabezado titulo="Buscar salidas" subtitulo="Horarios, tarifas y empresas de los tres puntos de transporte de Pasto." />

      <div className="diseno-busqueda">
        <aside className="tarjeta filtros" aria-label="Filtros">
          <div className="campo">
            <label htmlFor="buscar-destino">Destino</label>
            <div className="control">
              <Icono nombre="pin" />
              <input id="buscar-destino" list="destinos-buscar" value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Ej. Ipiales" />
            </div>
            <datalist id="destinos-buscar">{destinos.map((d) => <option key={d} value={d} />)}</datalist>
          </div>
          <div className="campo">
            <label htmlFor="buscar-fecha">Fecha</label>
            <div className="control">
              <Icono nombre="calendario" />
              <input id="buscar-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            {fecha && <button className="enlace pequeño" onClick={() => setFecha('')}>Ver todas las fechas</button>}
          </div>
          <div className="campo completo">
            <span className="etiqueta">Sale desde</span>
            <div className="opciones-punto">
              {[{ id: '', nombre: 'Todos los puntos' }, ...puntos].map((p) => (
                <button key={p.id} className={`opcion-punto ${puntoId === p.id ? 'activo' : ''}`} onClick={() => setPuntoId(p.id)} aria-pressed={puntoId === p.id}>
                  <span className="punto-punto" /> {p.nombre}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section aria-live="polite">
          {salidas && (
            <div className="resultados-cabeza">
              <h2>{salidas.length} {salidas.length === 1 ? 'salida' : 'salidas'} a {destino}</h2>
              <div className="segmentado" role="group" aria-label="Ordenar por">
                <button className={orden === 'hora' ? 'activo' : ''} onClick={() => setOrden('hora')}>Más temprano</button>
                <button className={orden === 'precio' ? 'activo' : ''} onClick={() => setOrden('precio')}>Más barato</button>
              </div>
            </div>
          )}

          <Error texto={error} />
          {cargando && !salidas && <Cargando />}
          {!destino && (
            <div className="tarjeta">
              <Vacio icono="buscar" titulo="¿A dónde vas?" texto="Escribe un destino para ver horarios, tarifas y desde qué punto sale.">
                <div className="chips" style={{ justifyContent: 'center' }}>
                  {destinos.map((d) => <button key={d} className="chip" onClick={() => setDestino(d)}>{d}</button>)}
                </div>
              </Vacio>
            </div>
          )}
          {salidas?.length === 0 && !cargando && (
            <div className="tarjeta">
              <Vacio titulo="No hay salidas para esa búsqueda" texto="Prueba otra fecha u otro punto de transporte." />
            </div>
          )}
          {dias.map((d) => (
            <div key={d.dia} className="dia">
              <h3 className="dia-titulo">
                <Icono nombre="calendario" tam={18} /> <span className="mayuscula" style={{ color: 'inherit', fontWeight: 800 }}>{fechaLarga(d.dia)}</span> <span>· {d.salidas.length}</span>
              </h3>
              <div className="lista-salidas">
                {d.salidas.map((s) => <TarjetaSalida key={s.id} salida={s} />)}
              </div>
            </div>
          ))}
        </section>
      </div>

      {comparar.length > 0 && (
        <div className="barra-comparar" role="region" aria-label="Comparación">
          <p>
            <strong>{comparar.length}</strong> {comparar.length === 1 ? 'salida marcada' : 'salidas marcadas'}
            {comparar.length < 2 && ' · marca otra para comparar'}
          </p>
          <button className="boton fantasma pequeño" style={{ color: '#c7d3e3' }} onClick={() => setComparar([])}>Limpiar</button>
          <button className="boton acento" disabled={comparar.length < 2} onClick={() => navegar('/comparar')}>
            Comparar <Icono nombre="derecha" tam={18} />
          </button>
        </div>
      )}
    </div>
  );
}
