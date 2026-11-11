import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, fechaCorta, hora, pesos, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import { Cargando, Error } from '../components/Mensaje';
import { useSesion } from '../sesion';

const DESCUENTO = { GENERAL: 0, ESTUDIANTE: 0.1, ADULTO_MAYOR: 0.2 };
const TASA_TERMINAL = 3000;

// HU_009 Ver asientos y HU_010 Comprar tiquete
export default function Asientos() {
  const { id } = useParams();
  const { usuario } = useSesion();
  const [asientos, setAsientos] = useState(null);
  const [salida, setSalida] = useState(null);
  const [elegido, setElegido] = useState(null);
  const [tipo, setTipo] = useState('GENERAL');
  const [tarjeta, setTarjeta] = useState('');
  const [error, setError] = useState('');
  const [comprando, setComprando] = useState(false);
  const navegar = useNavigate();

  useEffect(() => {
    api(`/api/salidas/${id}/asientos`).then(setAsientos).catch((e) => setError(e.message));
    // Datos de la salida que se guardaron al tocarla en la búsqueda
    const guardada = sessionStorage.getItem(`salida.${id}`);
    if (guardada) setSalida(JSON.parse(guardada));
  }, [id]);

  async function comprar(e) {
    e.preventDefault();
    setError('');
    setComprando(true);
    try {
      await api('/api/tiquetes', {
        metodo: 'POST',
        cuerpo: { salidaId: id, numeroAsiento: elegido, tipoPasajero: tipo, numeroTarjeta: tarjeta.replace(/\s/g, '') },
      });
      navegar('/tiquetes', { state: { comprado: true } });
    } catch (err) {
      setError(err.message);
      api(`/api/salidas/${id}/asientos`).then(setAsientos).catch(() => {});
    } finally {
      setComprando(false);
    }
  }

  const precio = salida ? salida.precioBase - salida.precioBase * DESCUENTO[tipo] + TASA_TERMINAL : null;

  return (
    <>
      <Encabezado titulo="Elegir asiento" atras />
      <section className="pagina">
        {salida && (
          <div className="tarjeta">
            <strong>{salida.destino} · {fechaCorta(salida.fechaHora)}</strong>
            <div className="tenue">{hora(salida.fechaHora)} → {hora(salida.horaEstimadaLlegada)} · {salida.empresa}</div>
            <div className="tenue">{salida.puntoTransporte}</div>
          </div>
        )}
        <Error texto={error} />
        {!asientos && !error && <Cargando />}
        {asientos && (
          <>
            <p className="tenue">{asientos.libres} de {asientos.capacidad} asientos libres</p>
            <div className="leyenda">
              <span><i className="asiento-mini libre" /> Libre</span>
              <span><i className="asiento-mini ocupado" /> Ocupado</span>
              <span><i className="asiento-mini elegido" /> Elegido</span>
            </div>
            <div className="bus">
              {asientos.asientos.map((a) => (
                <button
                  key={a.numero}
                  disabled={a.ocupado}
                  className={`asiento ${a.ocupado ? 'ocupado' : ''} ${elegido === a.numero ? 'elegido' : ''}`}
                  onClick={() => setElegido(a.numero)}
                >
                  {a.numero}
                </button>
              ))}
            </div>
          </>
        )}

        {elegido && !usuario && (
          <div className="tarjeta">
            <p>Para comprar el asiento {elegido} inicia sesión como pasajero.</p>
            <Link to="/cuenta" className="boton ancho">Iniciar sesión o registrarme</Link>
          </div>
        )}
        {elegido && usuario && usuario.rol !== 'PASAJERO' && (
          <p className="alerta">Solo los pasajeros pueden comprar tiquetes.</p>
        )}
        {elegido && usuario?.rol === 'PASAJERO' && (
          <form className="tarjeta" onSubmit={comprar}>
            <strong>Asiento {elegido}</strong>
            <label>Tipo de pasajero</label>
            <div className="chips">
              {Object.entries(TIPO_PASAJERO).map(([clave, texto]) => (
                <button type="button" key={clave} className={`chip ${tipo === clave ? 'activo' : ''}`} onClick={() => setTipo(clave)}>{texto}</button>
              ))}
            </div>
            <label>Número de tarjeta</label>
            <input inputMode="numeric" value={tarjeta} onChange={(e) => setTarjeta(e.target.value.replace(/[^\d ]/g, ''))}
              placeholder="16 dígitos" maxLength={19} pattern="(\d\s?){16}" title="La tarjeta debe tener 16 dígitos" required />
            <p className="tenue pequeño">
              Pago simulado: se aprueba cualquier tarjeta de 16 dígitos, menos las que terminan en 0000.{' '}
              <button type="button" className="enlace" onClick={() => setTarjeta('4111 1111 1111 1111')}>Usar tarjeta de prueba</button>
            </p>
            {precio !== null && (
              <div className="fila total"><span>Total</span><strong>{pesos(precio)}</strong></div>
            )}
            <button className="boton ancho" disabled={comprando}>{comprando ? 'Procesando pago…' : 'Pagar y comprar'}</button>
          </form>
        )}
      </section>
    </>
  );
}
