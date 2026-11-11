import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, fechaCorta, hora, pesos, SERVICIO } from '../api';
import Encabezado from '../components/Encabezado';
import Gestion from '../components/Gestion';
import Pestanas from '../components/Pestanas';
import Ventas from '../components/Ventas';
import { useSesion } from '../sesion';

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
      <Encabezado titulo={usuario.empresa} />
      <section className="pagina">
        <Pestanas opciones={['Salidas', 'Rutas', 'Buses', 'Ventas']} activa={pestana} cambiar={setPestana} />

        {pestana === 'Buses' && (
          <Gestion ruta="/api/buses" nombreNuevo="Nuevo bus" alGuardar={recargar}
            campos={[
              { nombre: 'placa', etiqueta: 'Placa' },
              { nombre: 'capacidad', etiqueta: 'Capacidad (10 a 45)', tipo: 'number' },
              { nombre: 'tipoServicio', etiqueta: 'Tipo de servicio', tipo: 'select', opciones: Object.entries(SERVICIO) },
            ]}
            mostrar={(b) => (<><strong>{b.placa}</strong><span className="tenue">{b.capacidad} asientos · {SERVICIO[b.tipoServicio]}</span></>)}
          />
        )}

        {pestana === 'Rutas' && (
          <Gestion ruta="/api/rutas" nombreNuevo="Nueva ruta" alGuardar={recargar}
            campos={[
              { nombre: 'destino', etiqueta: 'Destino' },
              { nombre: 'duracionMinutos', etiqueta: 'Duración (minutos)', tipo: 'number' },
              { nombre: 'puntoTransporteId', etiqueta: 'Punto de salida', tipo: 'select', opciones: puntos.map((p) => [p.id, p.nombre]) },
            ]}
            mostrar={(r) => (<><strong>{r.destino}</strong><span className="tenue">{r.puntoTransporte} · {r.duracionMinutos} min</span></>)}
          />
        )}

        {pestana === 'Salidas' && (
          <Gestion ruta="/api/salidas" nombreNuevo="Programar salida" editable={false} eliminable={false}
            campos={[
              { nombre: 'rutaId', etiqueta: 'Ruta', tipo: 'select', opciones: rutas.map((r) => [r.id, `${r.destino} (${r.puntoTransporte})`]) },
              { nombre: 'busId', etiqueta: 'Bus', tipo: 'select', opciones: buses.map((b) => [b.id, `${b.placa} · ${b.capacidad} asientos`]) },
              { nombre: 'fechaHora', etiqueta: 'Fecha y hora', tipo: 'datetime-local' },
              { nombre: 'precioBase', etiqueta: 'Precio base', tipo: 'number' },
            ]}
            mostrar={(s) => (
              <>
                <div className="fila"><strong>{s.destino}</strong><strong>{pesos(s.precioBase)}</strong></div>
                <span className="tenue">{fechaCorta(s.fechaHora)} · {hora(s.fechaHora)} → {hora(s.horaEstimadaLlegada)} · {s.placaBus}</span>
                <span className="tenue">{s.asientosLibres} de {s.capacidad} libres {s.cancelada && <span className="insignia gris">Cancelada</span>}</span>
              </>
            )}
            acciones={(s, accion) => !s.cancelada && (
              <button className="enlace rojo" onClick={() => window.confirm('¿Cancelar esta salida?') &&
                accion(async () => { await api(`/api/salidas/${s.id}/cancelar`, { metodo: 'PUT' }); return 'Salida cancelada.'; })}>
                Cancelar salida
              </button>
            )}
          />
        )}

        {pestana === 'Ventas' && <Ventas />}
      </section>
    </>
  );
}
