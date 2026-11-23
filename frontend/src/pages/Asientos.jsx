import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, colorEmpresa, duracion, fechaLarga, hora, pesos, SERVICIO, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import Icono from '../components/Icono';
import { Aviso, Cargando, Error } from '../components/Mensaje';
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

  const descuento = salida ? salida.precioBase * DESCUENTO[tipo] : 0;
  const precio = salida ? salida.precioBase - descuento + TASA_TERMINAL : null;
  const esPasajero = usuario?.rol === 'PASAJERO';
  const paso = !elegido ? 1 : !esPasajero ? 2 : 3;

  return (
    <div className="contenedor pagina">
      <Encabezado atras titulo={salida ? `Pasto → ${salida.destino}` : 'Elige tu asiento'}
        subtitulo={salida ? `${salida.empresa} · ${fechaLarga(salida.fechaHora)}` : 'Toca un asiento libre en el mapa del bus.'} />

      <ol className="pasos-compra" aria-label="Pasos de la compra">
        {['Asiento', 'Pasajero', 'Pago'].map((nombre, i) => (
          <li key={nombre} className={paso > i + 1 ? 'hecho' : paso === i + 1 ? 'actual' : ''}>
            <span className="num">{paso > i + 1 ? <Icono nombre="check" tam={14} /> : i + 1}</span> {nombre}
          </li>
        ))}
      </ol>

      <div className="diseno-compra">
        <section className="tarjeta">
          {salida && (
            <div className="viaje-resumen">
              <span className="salida-horario" style={{ gridColumn: 'auto' }}>
                <span className="salida-hora">{hora(salida.fechaHora)}</span>
                <span className="salida-linea" style={{ minWidth: 90 }}>{duracion(salida.duracionMinutos)}</span>
                <span className="salida-hora">{hora(salida.horaEstimadaLlegada)}</span>
              </span>
              <div className="viaje-meta">
                <span><i className="marca-empresa" style={{ background: colorEmpresa(salida.empresa) }} /> {salida.empresa}</span>
                <span><Icono nombre="bus" tam={16} /> {SERVICIO[salida.tipoServicio]} · {salida.placaBus}</span>
                <span><Icono nombre="edificio" tam={16} /> {salida.puntoTransporte}</span>
              </div>
            </div>
          )}

          <div className="mapa-bus">
            <div className="fila" style={{ flexWrap: 'wrap' }}>
              <h2>Mapa del bus</h2>
              <div className="leyenda">
                <span><i className="asiento-mini" /> Libre</span>
                <span><i className="asiento-mini ocupado" /> Ocupado</span>
                <span><i className="asiento-mini elegido" /> Tu asiento</span>
              </div>
            </div>
            {!asientos && !error && <Cargando filas={2} />}
            {asientos && (
              <>
                <div className="bus">
                  <div className="bus-frente">
                    <span className="volante"><Icono nombre="volante" tam={20} /> Conductor</span>
                    <span>{asientos.libres} de {asientos.capacidad} libres</span>
                  </div>
                  <div className="asientos">
                    {asientos.asientos.map((a, i) => (
                      <button
                        key={a.numero}
                        disabled={a.ocupado}
                        style={{ '--fila': Math.floor(i / 4) + 1, '--lugar': (i % 4) + 1 + (i % 4 >= 2 ? 1 : 0) }}
                        className={`asiento ${a.ocupado ? 'ocupado' : ''} ${elegido === a.numero ? 'elegido' : ''}`}
                        onClick={() => setElegido(a.numero)}
                        aria-pressed={elegido === a.numero}
                        aria-label={`Asiento ${a.numero}${a.ocupado ? ', ocupado' : ''}`}
                      >
                        {a.numero}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <aside className="tarjeta panel-compra" aria-label="Resumen de compra">
          <div className={`paso-compra ${elegido ? 'hecho' : ''}`}>
            <h3><span className="num">1</span> Tu asiento</h3>
            {elegido ? (
              <p className="asiento-elegido">Asiento <strong>{elegido}</strong></p>
            ) : (
              <p className="tenue">Toca un asiento libre en el mapa.</p>
            )}
          </div>

          <div className={`paso-compra ${elegido && esPasajero ? 'hecho' : ''}`}>
            <h3><span className="num">2</span> Tipo de pasajero</h3>
            <div className="segmentado" role="group" aria-label="Tipo de pasajero">
              {Object.entries(TIPO_PASAJERO).map(([clave, texto]) => (
                <button type="button" key={clave} className={tipo === clave ? 'activo' : ''} onClick={() => setTipo(clave)}>{texto}</button>
              ))}
            </div>
            {precio !== null && (
              <div className="desglose">
                <div><span className="tenue">Precio base</span><span>{pesos(salida.precioBase)}</span></div>
                {descuento > 0 && <div className="descuento"><span>Descuento {TIPO_PASAJERO[tipo].toLowerCase()} ({DESCUENTO[tipo] * 100}%)</span><span>−{pesos(descuento)}</span></div>}
                <div><span className="tenue">Tasa de uso de terminal</span><span>{pesos(TASA_TERMINAL)}</span></div>
                <div className="total"><span>Total</span><span>{pesos(precio)}</span></div>
              </div>
            )}
          </div>

          <div className="paso-compra">
            <h3><span className="num">3</span> Pago</h3>
            {!usuario && (
              <>
                <p className="tenue">Inicia sesión como pasajero para comprar{elegido ? ` el asiento ${elegido}` : ''}.</p>
                <Link to="/cuenta" className="boton ancho">Iniciar sesión o registrarme</Link>
              </>
            )}
            {usuario && !esPasajero && <Aviso>Solo los pasajeros pueden comprar tiquetes.</Aviso>}
            {esPasajero && (
              <form className="pila" onSubmit={comprar}>
                <div className="campo">
                  <label htmlFor="tarjeta">Número de tarjeta</label>
                  <div className="control">
                    <Icono nombre="tarjeta" />
                    <input id="tarjeta" inputMode="numeric" value={tarjeta} onChange={(e) => setTarjeta(e.target.value.replace(/[^\d ]/g, ''))}
                      placeholder="1234 5678 9012 3456" maxLength={19} pattern="(\d\s?){16}" title="La tarjeta debe tener 16 dígitos" required />
                  </div>
                  <span className="ayuda">
                    Pago simulado: se aprueba cualquier tarjeta de 16 dígitos, menos las que terminan en 0000.{' '}
                    <button type="button" className="enlace" onClick={() => setTarjeta('4111 1111 1111 1111')}>Usar tarjeta de prueba</button>
                  </span>
                </div>
                <Error texto={error} />
                <button className="boton grande ancho" disabled={comprando || !elegido}>
                  {comprando ? 'Procesando pago…' : elegido ? `Pagar ${precio !== null ? pesos(precio) : ''}` : 'Elige un asiento'}
                </button>
              </form>
            )}
            {!esPasajero && <Error texto={error} />}
          </div>
        </aside>
      </div>
    </div>
  );
}
