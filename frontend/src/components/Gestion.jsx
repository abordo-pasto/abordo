import { useEffect, useState } from 'react';
import { api } from '../api';
import { Cargando, Error, Exito } from './Mensaje';

/**
 * Lista con formulario para crear, editar y eliminar registros de un endpoint REST.
 * campos: [{ nombre, etiqueta, tipo: 'text'|'number'|'datetime-local'|'select', opciones: [[valor, texto]] }]
 */
export default function Gestion({ ruta, campos, mostrar, editable = true, eliminable = true, acciones, alGuardar, nombreNuevo = 'Nuevo' }) {
  const vacio = Object.fromEntries(campos.map((c) => [c.nombre, c.inicial ?? '']));
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(null);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');

  const cargar = () => api(ruta).then(setItems).catch((e) => setError(e.message));
  useEffect(() => { cargar(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [ruta]);

  function abrir(item) {
    setError('');
    setEditando(item?.id || null);
    setForm(item ? Object.fromEntries(campos.map((c) => [c.nombre, c.desde ? c.desde(item) : item[c.nombre] ?? ''])) : vacio);
  }

  async function guardar(e) {
    e.preventDefault();
    setError('');
    const cuerpo = Object.fromEntries(campos.map((c) => [c.nombre, c.tipo === 'number' ? Number(form[c.nombre]) : form[c.nombre]]));
    try {
      await api(editando ? `${ruta}/${editando}` : ruta, { metodo: editando ? 'PUT' : 'POST', cuerpo });
      setAviso(editando ? 'Cambios guardados.' : 'Registro creado.');
      setForm(null);
      cargar();
      alGuardar?.();
    } catch (err) {
      setError(err.message);
    }
  }

  async function eliminar(item) {
    if (!window.confirm('¿Eliminar este registro?')) return;
    setError('');
    try {
      await api(`${ruta}/${item.id}`, { metodo: 'DELETE' });
      setAviso('Registro eliminado.');
      cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  async function accion(fn) {
    setError('');
    try {
      setAviso(await fn());
      cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Exito texto={aviso} />
      <Error texto={error} />
      {form ? (
        <form className="tarjeta" onSubmit={guardar}>
          <strong>{editando ? 'Editar' : nombreNuevo}</strong>
          {campos.map((c) => (
            <div key={c.nombre}>
              <label>{c.etiqueta}</label>
              {c.tipo === 'select' ? (
                <select value={form[c.nombre]} onChange={(e) => setForm({ ...form, [c.nombre]: e.target.value })} required>
                  <option value="">Seleccione…</option>
                  {c.opciones.map(([valor, texto]) => <option key={valor} value={valor}>{texto}</option>)}
                </select>
              ) : (
                <input type={c.tipo || 'text'} value={form[c.nombre]} onChange={(e) => setForm({ ...form, [c.nombre]: e.target.value })} required={c.requerido !== false} />
              )}
            </div>
          ))}
          <div className="fila-form">
            <button className="boton">Guardar</button>
            <button type="button" className="boton secundario" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <button className="boton ancho" onClick={() => abrir(null)}>+ {nombreNuevo}</button>
      )}
      {!items && !error && <Cargando />}
      {items?.length === 0 && <p className="tenue centro">Todavía no hay registros.</p>}
      {items?.map((item) => (
        <div key={item.id} className="tarjeta">
          {mostrar(item)}
          <div className="acciones">
            {acciones?.(item, accion)}
            {editable && <button className="enlace" onClick={() => abrir(item)}>Editar</button>}
            {eliminable && <button className="enlace rojo" onClick={() => eliminar(item)}>Eliminar</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
