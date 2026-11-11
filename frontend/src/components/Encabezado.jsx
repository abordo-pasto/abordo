import { useNavigate } from 'react-router-dom';

export default function Encabezado({ titulo, atras }) {
  const navegar = useNavigate();
  return (
    <header className="encabezado">
      {atras && (
        <button className="atras" onClick={() => navegar(-1)} aria-label="Volver">←</button>
      )}
      <h1>{titulo}</h1>
    </header>
  );
}
