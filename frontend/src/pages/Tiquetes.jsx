import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api, ESTADO_TIQUETE, fechaCorta, hora, pesos, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import { Cargando, Error, Exito, Vacio } from '../components/Mensaje';
import { useSesion } from '../sesion';

// HU_011 Consultar mis tiquetes y HU_012 Cancelar
export default function Tiquetes() {
  const { usuario } = useSesion();
  const { state } = useLocation();
  const [estado, setEstado] = useState('');
  const [tiquetes, setTiquetes] = useState(null);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState(state?.comprado ? '¡Compra exitosa! Tu tiquete está activo.' : '');

  function cargar() {
    api(`/api/tiquetes${estado ? `?estado=${estado}` : ''}`).then(setTiquetes).catch((e) => setError(e.message));
  }

  useEffect(() => {
    if (usuario?.rol === 'PASAJERO') cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, usuario]);

  async function cancelar(t) {
    if (!window.confirm(`¿Cancelar el tiquete ${t.codigo}? El asiento quedará libre.`)) return;
    setError('');
    try {
      await api(`/api/tiquetes/${t.id}/cancelar`, { metodo: 'PUT' });
      setAviso(`Tiquete ${t.codigo} cancelado.`);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  if (usuario?.rol !== 'PASAJERO') {
    return (
      <>
        <Encabezado titulo="Mis tiquetes" />
        <section className="pagina">
          <Vacio titulo="Inicia sesión como pasajero" texto="Así verás tus tiquetes comprados." />
          <Link to="/cuenta" className="boton ancho">Ir a Cuenta</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Encabezado titulo="Mis tiquetes" />
      <section className="pagina">
        <div className="chips">
          <button className={`chip ${!estado ? 'activo' : ''}`} onClick={() => setEstado('')}>Todos</button>
          {Object.entries(ESTADO_TIQUETE).map(([clave, texto]) => (
            <button key={clave} className={`chip ${estado === clave ? 'activo' : ''}`} onClick={() => setEstado(clave)}>{texto}</button>
          ))}
        </div>
        <Exito texto={aviso} />
        <Error texto={error} />
        {!tiquetes && !error && <Cargando />}
        {tiquetes?.length === 0 && <Vacio titulo="No tienes tiquetes" texto="Busca una salida y compra tu primer tiquete." />}
        {tiquetes?.map((t) => (
          <div key={t.id} className="tarjeta tiquete">
            <div className="fila">
              <strong>{t.salida.destino}</strong>
              <span className={`insignia ${t.estado === 'ACTIVO' ? 'verde' : 'gris'}`}>{ESTADO_TIQUETE[t.estado]}</span>
            </div>
            <div className="tenue">{fechaCorta(t.salida.fechaHora)} · {hora(t.salida.fechaHora)} → {hora(t.salida.horaEstimadaLlegada)}</div>
            <div className="tenue">{t.salida.empresa} · {t.salida.puntoTransporte}</div>
            <div className="fila">
              <span>Asiento <strong>{t.numeroAsiento}</strong> · {TIPO_PASAJERO[t.tipoPasajero]}</span>
              <strong>{pesos(t.precioFinal)}</strong>
            </div>
            <div className="fila">
              <code>{t.codigo}</code>
              {t.puedeCancelarse && <button className="boton peligro pequeño" onClick={() => cancelar(t)}>Cancelar</button>}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
