import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, fechaCorta, hora, pesos, SERVICIO, TIPO_PASAJERO } from '../api';
import Encabezado from '../components/Encabezado';
import { Cargando, Error, Vacio } from '../components/Mensaje';
import { useSesion } from '../sesion';

// HU_015: comparar de 2 a 4 salidas y marcar la más barata y la más rápida
export default function Comparar() {
  const { comparar, setComparar } = useSesion();
  const [tipo, setTipo] = useState('GENERAL');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    if (comparar.length < 2) return;
    const ids = comparar.map((s) => s.id).join(',');
    api(`/api/salidas/comparar?ids=${ids}&tipoPasajero=${tipo}`).then(setResultado).catch((e) => setError(e.message));
  }, [comparar, tipo]);

  if (comparar.length < 2) {
    return (
      <>
        <Encabezado titulo="Comparar" />
        <section className="pagina">
          <Vacio titulo="Elige de 2 a 4 salidas" texto="En Buscar, marca “Comparar” en las salidas al mismo destino." />
          <button className="boton ancho" onClick={() => navegar('/buscar')}>Ir a buscar</button>
        </section>
      </>
    );
  }

  const opciones = resultado?.opciones || [];
  const fila = (titulo, valor, negrita) => (
    <tr>
      <th>{titulo}</th>
      {opciones.map((o) => <td key={o.salida.id} className={negrita ? 'negrita' : ''}>{valor(o)}</td>)}
    </tr>
  );

  return (
    <>
      <Encabezado titulo={`Comparar · ${comparar[0].destino} ${fechaCorta(comparar[0].fechaHora).slice(0, -5)}`} atras />
      <section className="pagina">
        <Error texto={error} />
        {!resultado && !error && <Cargando />}
        {resultado && (
          <>
            <div className="chips">
              {Object.entries(TIPO_PASAJERO).map(([clave, texto]) => (
                <button key={clave} className={`chip ${tipo === clave ? 'activo' : ''}`} onClick={() => setTipo(clave)}>{texto}</button>
              ))}
            </div>
            <div className="tabla-scroll">
              <table className="comparacion">
                <thead>
                  <tr><th></th>{opciones.map((o, i) => <th key={o.salida.id}>S{i + 1}</th>)}</tr>
                </thead>
                <tbody>
                  {fila('Empresa', (o) => o.salida.empresa)}
                  {fila('Fecha', (o) => fechaCorta(o.salida.fechaHora))}
                  {fila('Sale', (o) => hora(o.salida.fechaHora))}
                  {fila('Llega', (o) => hora(o.salida.horaEstimadaLlegada))}
                  {fila('Servicio', (o) => SERVICIO[o.salida.tipoServicio])}
                  {fila('Punto', (o) => o.salida.puntoTransporte)}
                  {Object.entries(TIPO_PASAJERO).map(([clave, texto]) => (
                    <tr key={clave} className={clave === tipo ? 'resaltada' : ''}>
                      <th>{texto}</th>
                      {opciones.map((o) => <td key={o.salida.id}>{pesos(o.preciosFinales[clave])}</td>)}
                    </tr>
                  ))}
                  {fila('Marca', (o) => (
                    <>
                      {o.masBarata && <span className="insignia verde">Más barata</span>}
                      {o.masRapida && <span className="insignia azul">Más rápida</span>}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tenue pequeño">Precio final = base − descuento + tasa de terminal ($3.000).</p>
            <button className="boton ancho" onClick={() => navegar(`/salidas/${resultado.masBarataId}`)}>
              Elegir la más barata
            </button>
            <button className="boton ancho secundario" onClick={() => setComparar([])}>Limpiar comparación</button>
          </>
        )}
      </section>
    </>
  );
}
