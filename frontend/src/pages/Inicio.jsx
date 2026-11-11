import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Encabezado from '../components/Encabezado';
import { Cargando, Error } from '../components/Mensaje';

// HU_014: los puntos de transporte de Pasto y desde cuál sale un destino
export default function Inicio() {
  const [puntos, setPuntos] = useState(null);
  const [destino, setDestino] = useState('');
  const [destinos, setDestinos] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    api('/api/puntos').then(setPuntos).catch((e) => setError(e.message));
    api('/api/rutas/destinos').then(setDestinos).catch(() => {});
  }, []);

  async function consultar(e) {
    e.preventDefault();
    if (!destino.trim()) return;
    try {
      setResultado({ destino, puntos: await api(`/api/puntos/hacia?destino=${encodeURIComponent(destino)}`) });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Encabezado titulo="Abordo" />
      <section className="pagina">
        <p className="intro">Consulta, compara y planifica tu viaje desde los puntos de transporte de Pasto.</p>

        <form className="tarjeta" onSubmit={consultar}>
          <label>¿A dónde viajas?</label>
          <div className="fila-form">
            <input list="lista-destinos" value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Ej. Sandoná" />
            <button className="boton">Ver punto</button>
          </div>
          <datalist id="lista-destinos">
            {destinos.map((d) => <option key={d} value={d} />)}
          </datalist>
          {resultado && (
            <div className="resultado-destino">
              {resultado.puntos.length === 0 ? (
                <p className="tenue">Ningún punto tiene rutas a {resultado.destino}.</p>
              ) : (
                <>
                  <p>{resultado.destino} sale desde <strong>{resultado.puntos.map((p) => p.nombre).join(' y ')}</strong>.</p>
                  <button type="button" className="boton secundario" onClick={() => navegar(`/buscar?destino=${encodeURIComponent(resultado.destino)}`)}>
                    Ver salidas
                  </button>
                </>
              )}
            </div>
          )}
        </form>

        <h2>Puntos de transporte</h2>
        <Error texto={error} />
        {!puntos && !error && <Cargando />}
        {puntos?.map((p) => (
          <Link key={p.id} to={`/puntos/${p.id}`} className="tarjeta punto-tarjeta">
            <strong>{p.nombre}</strong>
            <span className="tenue">{p.zonaQueAtiende}</span>
            <span className="tenue pequeño">{p.direccion} · {p.horarioAtencion}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
