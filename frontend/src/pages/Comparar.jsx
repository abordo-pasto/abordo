import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, colorEmpresa, duracion, fechaCorta, hora, pesos, SERVICIO, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import Icono from '../components/Icono';
import { Cargando, Error, Vacio } from '../components/Mensaje';
import { useSesion } from '../sesion';

// HU_015: comparar de 2 a 4 salidas y marcar la más barata y la más rápida
export default function Comparar() {
  const { comparar, setComparar, alternarComparar } = useSesion();
  const [tipo, setTipo] = useState('GENERAL');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    if (comparar.length < 2) return;
    setError('');
    const ids = comparar.map((s) => s.id).join(',');
    api(`/api/salidas/comparar?ids=${ids}&tipoPasajero=${tipo}`).then(setResultado).catch((e) => setError(e.message));
  }, [comparar, tipo]);

  if (comparar.length < 2) {
    return (
      <div className="contenedor pagina">
        <Encabezado titulo="Comparar salidas" subtitulo="Pon lado a lado de 2 a 4 salidas al mismo destino." />
        <div className="tarjeta">
          <Vacio icono="comparar" titulo={comparar.length ? 'Marca una salida más' : 'Elige de 2 a 4 salidas'}
            texto="En Buscar, marca la casilla “Comparar” en las salidas al mismo destino.">
            <button className="boton" onClick={() => navegar('/buscar')}><Icono nombre="buscar" /> Ir a buscar</button>
          </Vacio>
        </div>
      </div>
    );
  }

  const opciones = resultado?.opciones || [];
  const elegir = (salida) => {
    sessionStorage.setItem(`salida.${salida.id}`, JSON.stringify(salida));
    navegar(`/salidas/${salida.id}`);
  };

  return (
    <div className="contenedor pagina">
      <Encabezado atras titulo={`Comparar salidas a ${comparar[0].destino}`}
        subtitulo="El precio final ya incluye el descuento del tipo de pasajero y la tasa de uso de la terminal.">
        <button className="boton secundario" onClick={() => setComparar([])}>Limpiar comparación</button>
      </Encabezado>

      <div className="fila" style={{ flexWrap: 'wrap', marginBottom: 'var(--e5)' }}>
        <div className="segmentado" role="group" aria-label="Tipo de pasajero">
          {Object.entries(TIPO_PASAJERO).map(([clave, texto]) => (
            <button key={clave} className={tipo === clave ? 'activo' : ''} onClick={() => setTipo(clave)}>{texto}</button>
          ))}
        </div>
        {resultado && (
          <button className="boton acento" onClick={() => elegir(opciones.find((o) => o.salida.id === resultado.masBarataId).salida)}>
            <Icono nombre="etiqueta" tam={18} /> Elegir la más barata
          </button>
        )}
      </div>

      <Error texto={error} />
      {!resultado && !error && <Cargando filas={2} />}
      {resultado && (
        <div className={`opciones-comparar n${opciones.length}`}>
          {opciones.map((o) => (
            <article key={o.salida.id} className={`tarjeta opcion ${o.masBarata ? 'destacada' : ''}`}>
              <div className="fila">
                <span className="salida-empresa">
                  <i className="marca-empresa" style={{ background: colorEmpresa(o.salida.empresa) }} /> {o.salida.empresa}
                </span>
                <button className="boton fantasma pequeño" aria-label="Quitar de la comparación"
                  onClick={() => alternarComparar(comparar.find((s) => s.id === o.salida.id))}>
                  <Icono nombre="cerrar" tam={16} />
                </button>
              </div>
              <div className="opcion-insignias">
                {o.masBarata && <span className="insignia verde"><Icono nombre="etiqueta" tam={14} /> Más barata</span>}
                {o.masRapida && <span className="insignia amarilla"><Icono nombre="rayo" tam={14} /> Más rápida</span>}
              </div>
              <div className="salida-horario" style={{ gridColumn: 'auto' }}>
                <span className="salida-hora">{hora(o.salida.fechaHora)}</span>
                <span className="salida-linea">{duracion(o.salida.duracionMinutos)}</span>
                <span className="salida-hora">{hora(o.salida.horaEstimadaLlegada)}</span>
              </div>
              <div>
                <span className="tenue pequeño">Precio final · {TIPO_PASAJERO[tipo]}</span>
                <div className="opcion-precio">{pesos(o.preciosFinales[tipo])}</div>
              </div>
              <dl className="opcion-lista">
                <div><dt>Fecha</dt><dd>{fechaCorta(o.salida.fechaHora)}</dd></div>
                <div><dt>Servicio</dt><dd>{SERVICIO[o.salida.tipoServicio]}</dd></div>
                <div><dt>Sale desde</dt><dd>{o.salida.puntoTransporte}</dd></div>
                <div><dt>Cupos</dt><dd>{o.salida.asientosLibres} libres</dd></div>
                {Object.entries(TIPO_PASAJERO).filter(([clave]) => clave !== tipo).map(([clave, texto]) => (
                  <div key={clave}><dt>{texto}</dt><dd>{pesos(o.preciosFinales[clave])}</dd></div>
                ))}
              </dl>
              <button className={`boton ${o.masBarata ? '' : 'secundario'}`} onClick={() => elegir(o.salida)}>
                Elegir esta salida
              </button>
            </article>
          ))}
        </div>
      )}
      <p className="nota-formula"><Icono nombre="info" tam={18} /> Precio final = precio base − descuento + tasa de uso de terminal ($3.000).</p>
    </div>
  );
}
