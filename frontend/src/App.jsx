import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Logo } from './components/Icono';
import { BarraInferior, BarraSuperior } from './components/Navegacion';
import Inicio from './pages/Inicio';
import DetallePunto from './pages/DetallePunto';
import Buscar from './pages/Buscar';
import Comparar from './pages/Comparar';
import Asientos from './pages/Asientos';
import Tiquetes from './pages/Tiquetes';
import Cuenta from './pages/Cuenta';
import PanelOperador from './pages/PanelOperador';
import PanelAdmin from './pages/PanelAdmin';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="app">
      <BarraSuperior />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/puntos/:id" element={<DetallePunto />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/comparar" element={<Comparar />} />
          <Route path="/salidas/:id" element={<Asientos />} />
          <Route path="/tiquetes" element={<Tiquetes />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/operador" element={<PanelOperador />} />
          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="pie">
        <div className="contenedor pie-rejilla">
          <div className="pie-marca">
            <span className="marca"><Logo tam={30} /> Abordo</span>
            <p>Consulta, compara y planifica tus viajes desde los puntos de transporte de Pasto, Nariño.</p>
          </div>
          <div>
            <h4>Navegar</h4>
            <Link to="/buscar">Buscar salidas</Link>
            <Link to="/comparar">Comparar</Link>
            <Link to="/tiquetes">Mis tiquetes</Link>
          </div>
          <div>
            <h4>Puntos de transporte</h4>
            <span>Terminal de Transportes de Pasto</span>
            <span>Terminal Mixto</span>
            <span>Terminal Torobajo (sector norte)</span>
          </div>
          <div>
            <h4>El proyecto</h4>
            <span>Diseño de Software · UCC Pasto</span>
            <a href="https://github.com/abordo-pasto/abordo" target="_blank" rel="noreferrer">Código en GitHub ↗</a>
          </div>
        </div>
        <p className="contenedor pie-nota">Proyecto académico. Los pagos son simulados.</p>
      </footer>
      <BarraInferior />
    </div>
  );
}
