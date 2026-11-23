import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, fechaCorta, hora, pesos, SERVICIO } from '../api';
import { CabezaPanel } from '../components/Encabezado';
import Gestion from '../components/Gestion';
import Icono from '../components/Icono';
import Pestanas from '../components/Pestanas';
import Ventas from '../components/Ventas';
import { useSesion } from '../sesion';

const PESTANAS = [
  { texto: 'Salidas', icono: 'calendario' },
  { texto: 'Rutas', icono: 'ruta' },
  { texto: 'Buses', icono: 'bus' },
  { texto: 'Ventas', icono: 'grafico' },
];

// HU_004 Buses, HU_005 Rutas, HU_006 Salidas y HU_007 Ventas del operador
export default function PanelOperador() {
  const { usuario } = useSesion();
  const [pestana, setPestana] = useState('Salidas');
  const [puntos, setPuntos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [buses, setBuses] = useState([]);

  const recargar = () => {
    api('/api/rutas').then(setRutas).catch(() => {});
    api('/api/buses').then(setBuses).catch(() => {});
  };
  useEffect(() => {
    if (usuario?.rol !== 'OPERADOR') return;
    api('/api/puntos').then(setPuntos).catch(() => {});
    recargar();
  }, [usuario]);

  if (usuario?.rol !== 'OPERADOR') return <Navigate to="/cuenta" />;

  return (
    <>
      <CabezaPanel antetitulo="Panel de empresa" titulo={usuario.empresa}
        subtitulo="Programa salidas, administra tus rutas y buses, y revisa cuánto has vendido." />
      <div className="contenedor pagina">
        <div className="diseno-panel">
          <Pestanas opciones={PESTANAS} activa={pestana} cambiar={setPestana} />
          <div>
            {pestana === 'Buses' && (
              <Gestion titulo="Buses" descripcion="La capacidad define cuántos asientos se venden por salida." ruta="/api/buses" nombreNuevo="Nuevo bus" alGuardar={recargar}
                campos={[
                  { nombre: 'placa', etiqueta: 'Placa' },
                  { nombre: 'capacidad', etiqueta: 'Capacidad (10 a 45)', tipo: 'number' },
                  { nombre: 'tipoServicio', etiqueta: 'Tipo de servicio', tipo: 'select', opciones: Object.entries(SERVICIO) },
                ]}
                mostrar={(b) => (
                  <>
                    <div className="fila"><strong className="codigo" style={{ fontSize: '1.05rem' }}>{b.placa}</strong><span className="insignia azul">{SERVICIO[b.tipoServicio]}</span></div>
                    <span className="tenue"><Icono nombre="usuarios" tam={14} /> {b.capacidad} asientos</span>
                  </>
                )}
              />
            )}

            {pestana === 'Rutas' && (
              <Gestion titulo="Rutas" descripcion="Destino, duración y punto de transporte desde donde sale." ruta="/api/rutas" nombreNuevo="Nueva ruta" alGuardar={recargar}
                campos={[
                  { nombre: 'destino', etiqueta: 'Destino' },
                  { nombre: 'duracionMinutos', etiqueta: 'Duración (minutos)', tipo: 'number' },
                  { nombre: 'puntoTransporteId', etiqueta: 'Punto de salida', tipo: 'select', opciones: puntos.map((p) => [p.id, p.nombre]) },
                ]}
                mostrar={(r) => (
                  <>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--tinta)' }}>Pasto → {r.destino}</strong>
                    <span className="tenue pequeño"><Icono nombre="edificio" tam={14} /> {r.puntoTransporte}</span>
                    <span className="tenue pequeño"><Icono nombre="reloj" tam={14} /> {r.duracionMinutos} min</span>
                  </>
                )}
              />
            )}

            {pestana === 'Salidas' && (
              <Gestion titulo="Salidas programadas" descripcion="Ocupación de cada salida. Una salida cancelada libera los asientos." ruta="/api/salidas" nombreNuevo="Programar salida" editable={false} eliminable={false}
                campos={[
                  { nombre: 'rutaId', etiqueta: 'Ruta', tipo: 'select', opciones: rutas.map((r) => [r.id, `${r.destino} (${r.puntoTransporte})`]) },
                  { nombre: 'busId', etiqueta: 'Bus', tipo: 'select', opciones: buses.map((b) => [b.id, `${b.placa} · ${b.capacidad} asientos`]) },
                  { nombre: 'fechaHora', etiqueta: 'Fecha y hora', tipo: 'datetime-local' },
                  { nombre: 'precioBase', etiqueta: 'Precio base', tipo: 'number' },
                ]}
                resumen={(salidas) => {
                  const vigentes = salidas.filter((s) => !s.cancelada);
                  const capacidad = vigentes.reduce((t, s) => t + s.capacidad, 0);
                  const vendidos = vigentes.reduce((t, s) => t + (s.capacidad - s.asientosLibres), 0);
                  return (
                    <div className="kpis" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginTop: 0 }}>
                      <div className="tarjeta compacta kpi"><span>Salidas vigentes</span><strong>{vigentes.length}</strong></div>
                      <div className="tarjeta compacta kpi"><span>Puestos vendidos</span><strong>{vendidos}</strong></div>
                      <div className="tarjeta compacta kpi"><span>Ocupación</span><strong>{capacidad ? +((vendidos / capacidad) * 100).toFixed(1) : 0}%</strong></div>
                    </div>
                  );
                }}
                mostrar={(s) => {
                  const vendidos = s.capacidad - s.asientosLibres;
                  return (
                    <>
                      <div className="fila">
                        <strong style={{ color: 'var(--tinta)' }}>Pasto → {s.destino}</strong>
                        {s.cancelada ? <span className="insignia roja">Cancelada</span> : <strong>{pesos(s.precioBase)}</strong>}
                      </div>
                      <span className="tenue pequeño">{fechaCorta(s.fechaHora)} · {hora(s.fechaHora)} → {hora(s.horaEstimadaLlegada)} · {s.placaBus}</span>
                      <div className="ocupacion">
                        <div className="barra-pista"><div className="barra-relleno" style={{ width: `${(vendidos / s.capacidad) * 100}%` }} /></div>
                        <div className="fila"><span>{vendidos} vendidos</span><span>{s.asientosLibres} de {s.capacidad} libres</span></div>
                      </div>
                    </>
                  );
                }}
                acciones={(s, accion) => !s.cancelada && (
                  <button className="boton fantasma pequeño" style={{ color: 'var(--error)' }} onClick={() => window.confirm('¿Cancelar esta salida?') &&
                    accion(async () => { await api(`/api/salidas/${s.id}/cancelar`, { metodo: 'PUT' }); return 'Salida cancelada.'; })}>
                    <Icono nombre="cerrar" tam={16} /> Cancelar salida
                  </button>
                )}
              />
            )}

            {pestana === 'Ventas' && <Ventas />}
          </div>
        </div>
      </div>
    </>
  );
}
