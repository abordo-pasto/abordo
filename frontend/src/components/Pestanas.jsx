import Icono from './Icono';

// opciones: ['Texto'] o [{ texto, icono }]
export default function Pestanas({ opciones, activa, cambiar }) {
  return (
    <div className="pestanas" role="tablist">
      {opciones.map((o) => {
        const texto = o.texto || o;
        return (
          <button key={texto} role="tab" aria-selected={texto === activa} className={texto === activa ? 'activa' : ''} onClick={() => cambiar(texto)}>
            {o.icono && <Icono nombre={o.icono} tam={18} />}
            {texto}
          </button>
        );
      })}
    </div>
  );
}
