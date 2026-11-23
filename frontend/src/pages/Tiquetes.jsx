import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api, colorEmpresa, ESTADO_TIQUETE, fechaLarga, hora, pesos, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import Icono from '../components/Icono';
import { Cargando, Error, Exito, Vacio } from '../components/Mensaje';
import { useSesion } from '../sesion';

// HU_011 Consultar mis tiquetes y HU_012 Cancelar
export default function Tiquetes() {
  const { usuario } = useSesion();
  const { state } = useLocation();
  const [estado, setEstado] = useState('');
  const [tiquetes, setTiquetes] = useState(null);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState(state?.comprado ? '¡Compra exitosa! Tu tiquete está activo. Muestra el código al abordar.' : '');

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
      <div className="contenedor pagina">
        <Encabezado titulo="Mis tiquetes" />
        <div className="tarjeta">
          <Vacio icono="tiquete" titulo="Inicia sesión como pasajero" texto="Así verás tus tiquetes comprados y podrás cancelarlos.">
            <Link to="/cuenta" className="boton">Iniciar sesión</Link>
          </Vacio>
        </div>
      </div>
    );
  }

  const activos = tiquetes?.filter((t) => t.estado === 'ACTIVO') || [];
  const pagado = activos.reduce((suma, t) => suma + t.precioFinal, 0);

  return (
    <div className="contenedor pagina">
      <Encabezado titulo="Mis tiquetes" subtitulo={`Hola, ${usuario.nombre.split(' ')[0]}. Aquí están tus viajes.`}>
        <Link to="/buscar" className="boton"><Icono nombre="buscar" tam={18} /> Comprar otro</Link>
      </Encabezado>

      {tiquetes && !estado && (
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginTop: 0 }}>
          <div className="tarjeta compacta kpi"><span>Tiquetes activos</span><strong>{activos.length}</strong></div>
          <div className="tarjeta compacta kpi"><span>Total de tiquetes</span><strong>{tiquetes.length}</strong></div>
          <div className="tarjeta compacta kpi"><span>Pagado en activos</span><strong>{pesos(pagado)}</strong></div>
        </div>
      )}

      <div className="segmentado" role="group" aria-label="Filtrar por estado" style={{ marginBottom: 'var(--e5)' }}>
        <button className={!estado ? 'activo' : ''} onClick={() => setEstado('')}>Todos</button>
        {Object.entries(ESTADO_TIQUETE).map(([clave, texto]) => (
          <button key={clave} className={estado === clave ? 'activo' : ''} onClick={() => setEstado(clave)}>{texto}</button>
        ))}
      </div>

      <Exito texto={aviso} />
      <Error texto={error} />
      {!tiquetes && !error && <Cargando filas={2} />}
      {tiquetes?.length === 0 && (
        <div className="tarjeta">
          <Vacio icono="tiquete" titulo={estado ? `No tienes tiquetes ${ESTADO_TIQUETE[estado].toLowerCase()}s` : 'No tienes tiquetes'} texto="Busca una salida y compra tu primer tiquete.">
            <Link to="/buscar" className="boton">Buscar salidas</Link>
          </Vacio>
        </div>
      )}
      <div className="tiquetes">
        {tiquetes?.map((t) => (
          <article key={t.id} className={`pase ${t.estado !== 'ACTIVO' ? 'inactivo' : ''}`}>
            <div className="pase-cabeza">
              <div>
                <small>Pasto →</small>
                <strong>{t.salida.destino}</strong>
              </div>
              <span className={`insignia ${t.estado === 'ACTIVO' ? 'verde' : 'gris'}`}>{ESTADO_TIQUETE[t.estado]}</span>
            </div>
            <div className="pase-cuerpo">
              <div className="pase-horas">
                <span className="salida-hora">{hora(t.salida.fechaHora)}</span>
                <span className="salida-linea mayuscula">{fechaLarga(t.salida.fechaHora)}</span>
                <span className="salida-hora">{hora(t.salida.horaEstimadaLlegada)}</span>
              </div>
              <div><small>Empresa</small><strong className="salida-empresa"><i className="marca-empresa" style={{ background: colorEmpresa(t.salida.empresa) }} />{t.salida.empresa}</strong></div>
              <div><small>Asiento</small><strong>{t.numeroAsiento}</strong></div>
              <div><small>Sale desde</small><strong>{t.salida.puntoTransporte}</strong></div>
              <div><small>Pasajero</small><strong>{TIPO_PASAJERO[t.tipoPasajero]}</strong></div>
            </div>
            <div className="pase-corte" />
            <div className="pase-pie">
              <div>
                <small className="tenue pequeño">Código</small>
                <div className="codigo">{t.codigo}</div>
              </div>
              <div className="barras" aria-hidden="true" />
              <div style={{ textAlign: 'right' }}>
                <small className="tenue pequeño">Pagado</small>
                <div className="negrita" style={{ color: 'var(--tinta)' }}>{pesos(t.precioFinal)}</div>
              </div>
            </div>
            {t.puedeCancelarse && (
              <div style={{ padding: '0 var(--e5) var(--e4)' }}>
                <button className="boton peligro pequeño ancho" onClick={() => cancelar(t)}>Cancelar tiquete</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
