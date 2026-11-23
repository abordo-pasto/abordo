import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, hoyISO } from '../api';
import Icono from '../components/Icono';
import { Cargando, Error } from '../components/Mensaje';

// HU_014: los puntos de transporte de Pasto y desde cuál sale un destino; entrada a HU_008
export default function Inicio() {
  const [puntos, setPuntos] = useState(null);
  const [destinos, setDestinos] = useState([]);
  const [busqueda, setBusqueda] = useState({ destino: '', fecha: hoyISO(), puntoId: '' });
  const [destino, setDestino] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    api('/api/puntos').then(setPuntos).catch((e) => setError(e.message));
    api('/api/rutas/destinos').then(setDestinos).catch(() => {});
  }, []);

  function buscar(e) {
    e.preventDefault();
    const q = new URLSearchParams();
    Object.entries(busqueda).forEach(([k, v]) => v && q.set(k, v));
    navegar(`/buscar?${q}`);
  }

  async function consultar(e) {
    e.preventDefault();
    if (!destino.trim()) return;
    setError('');
    try {
      setResultado({ destino, puntos: await api(`/api/puntos/hacia?destino=${encodeURIComponent(destino)}`) });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <section className="hero">
        <div className="contenedor hero-rejilla">
          <div>
            <h1>¿A dónde viajas hoy <em>desde Pasto</em>?</h1>
            <p className="hero-texto">
              Horarios, tarifas y empresas de los tres puntos de transporte de la ciudad en un solo lugar.
              Compara salidas y elige tu asiento en minutos.
            </p>
            <div className="hero-datos">
              <div><strong>{puntos?.length ?? 3}</strong><span>puntos de transporte</span></div>
              <div><strong>{destinos.length || '—'}</strong><span>destinos</span></div>
            </div>
          </div>
          <IlustracionBus />
        </div>
      </section>

      <div className="contenedor">
        <form className="buscador" onSubmit={buscar} aria-label="Buscar salidas">
          <div className="campo">
            <label htmlFor="inicio-destino">Destino</label>
            <div className="control">
              <Icono nombre="pin" />
              <input id="inicio-destino" list="lista-destinos" value={busqueda.destino} placeholder="¿A dónde vas? Ej. Ipiales"
                onChange={(e) => setBusqueda({ ...busqueda, destino: e.target.value })} required />
            </div>
            <datalist id="lista-destinos">{destinos.map((d) => <option key={d} value={d} />)}</datalist>
          </div>
          <div className="campo">
            <label htmlFor="inicio-fecha">Fecha</label>
            <div className="control">
              <Icono nombre="calendario" />
              <input id="inicio-fecha" type="date" value={busqueda.fecha} onChange={(e) => setBusqueda({ ...busqueda, fecha: e.target.value })} />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="inicio-punto">Sale desde</label>
            <div className="control">
              <Icono nombre="edificio" />
              <select id="inicio-punto" value={busqueda.puntoId} onChange={(e) => setBusqueda({ ...busqueda, puntoId: e.target.value })}>
                <option value="">Cualquier punto</option>
                {puntos?.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
            </div>
          </div>
          <button className="boton grande"><Icono nombre="buscar" /> Buscar salidas</button>
        </form>

        {destinos.length > 0 && (
          <div className="destinos-populares">
            <span className="tenue pequeño negrita">Destinos:</span>
            {destinos.map((d) => (
              <Link key={d} to={`/buscar?destino=${encodeURIComponent(d)}`} className="chip">{d}</Link>
            ))}
          </div>
        )}

        <section className="seccion">
          <div className="seccion-titulo">
            <div>
              <h2>Puntos de transporte de Pasto</h2>
              <p>Cada destino sale de un punto distinto. Mira cuál te sirve.</p>
            </div>
          </div>
          <Error texto={error} />
          {!puntos && !error && <Cargando filas={1} />}
          <div className="rejilla c3">
            {puntos?.map((p, i) => (
              <Link key={p.id} to={`/puntos/${p.id}`} className="tarjeta">
                <div className="punto">
                  <div className="punto-cabeza">
                    <span className={`punto-icono t${i % 3}`}><Icono nombre="edificio" tam={24} /></span>
                    <div>
                      <h3>{p.nombre}</h3>
                      <span className="tenue pequeño">{p.zonaQueAtiende}</span>
                    </div>
                  </div>
                  <div className="punto-dato"><Icono nombre="pin" tam={16} /> {p.direccion}</div>
                  <div className="punto-dato"><Icono nombre="reloj" tam={16} /> {p.horarioAtencion}</div>
                  <span className="enlace">Ver empresas y destinos <Icono nombre="derecha" tam={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="seccion tarjeta donde-sale">
          <div>
            <h2>¿Desde qué punto sale mi bus?</h2>
            <p className="tenue">Escribe el destino y te decimos a qué terminal ir.</p>
          </div>
          <div className="pila">
            <form onSubmit={consultar}>
              <div className="control" style={{ flex: 1 }}>
                <Icono nombre="pin" />
                <input aria-label="Destino" list="lista-destinos" value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Ej. Sandoná" />
              </div>
              <button className="boton secundario">Consultar</button>
            </form>
            {resultado && (
              <div className="resultado-destino">
                {resultado.puntos.length === 0 ? (
                  <p className="tenue">Ningún punto tiene rutas a {resultado.destino}.</p>
                ) : (
                  <>
                    <p>{resultado.destino} sale desde <strong>{resultado.puntos.map((p) => p.nombre).join(' y ')}</strong>.</p>
                    <button type="button" className="boton" onClick={() => navegar(`/buscar?destino=${encodeURIComponent(resultado.destino)}`)}>
                      Ver salidas a {resultado.destino} <Icono nombre="derecha" tam={18} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="seccion">
          <div className="seccion-titulo"><h2>Así de fácil</h2></div>
          <div className="rejilla c3">
            {[
              ['Consulta', 'Busca tu destino y ve horarios, tarifas y empresas de todos los puntos.'],
              ['Compara', 'Marca de 2 a 4 salidas y Abordo te dice cuál es la más barata y la más rápida.'],
              ['Compra', 'Elige tu asiento en el mapa del bus y recibe tu código de tiquete al instante.'],
            ].map(([titulo, texto], i) => (
              <div key={titulo} className="tarjeta paso">
                <span className="paso-num">{i + 1}</span>
                <h3>{titulo}</h3>
                <p className="tenue">{texto}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function IlustracionBus() {
  return (
    <svg className="hero-ilustracion" viewBox="0 0 460 260" role="img" aria-label="Bus intermunicipal en carretera">
      <path d="M0 210 C 120 190, 220 230, 460 200 L460 260 L0 260Z" fill="rgba(255,255,255,.06)" />
      <path d="M0 236 H460" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeDasharray="18 14" />
      <ellipse cx="230" cy="222" rx="170" ry="10" fill="#000" opacity=".25" />
      <rect x="60" y="80" width="340" height="128" rx="22" fill="#fff" />
      <path d="M370 80h8a22 22 0 0 1 22 22v62h-30z" fill="#d6e6f7" />
      <rect x="60" y="160" width="340" height="14" fill="#0a57a4" />
      <rect x="60" y="174" width="340" height="6" fill="#ffc83d" />
      {[84, 144, 204, 264].map((x) => <rect key={x} x={x} y="98" width="50" height="44" rx="8" fill="#133059" />)}
      <rect x="324" y="98" width="36" height="76" rx="6" fill="#133059" opacity=".9" />
      <rect x="388" y="186" width="10" height="10" rx="3" fill="#ffc83d" />
      {[130, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy="208" r="22" fill="#0f1e2e" />
          <circle cx={x} cy="208" r="9" fill="#94a3b8" />
        </g>
      ))}
      <text x="84" y="157" fill="#0a57a4" fontSize="13" fontWeight="800" fontFamily="inherit">ABORDO · PASTO</text>
      <circle cx="400" cy="40" r="22" fill="#ffc83d" opacity=".9" />
    </svg>
  );
}
