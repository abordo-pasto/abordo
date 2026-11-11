export default function Pestanas({ opciones, activa, cambiar }) {
  return (
    <div className="pestanas">
      {opciones.map((o) => (
        <button key={o} className={o === activa ? 'activa' : ''} onClick={() => cambiar(o)}>{o}</button>
      ))}
    </div>
  );
}
