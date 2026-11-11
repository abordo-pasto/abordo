import { Navigate, Route, Routes } from 'react-router-dom';
import BarraInferior from './components/BarraInferior';
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
  return (
    <div className="app">
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
      <BarraInferior />
    </div>
  );
}
