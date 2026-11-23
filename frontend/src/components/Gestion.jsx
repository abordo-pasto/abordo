import { useEffect, useState } from 'react';
import { api } from '../api';
import Icono from './Icono';
import { Cargando, Error, Exito, Vacio } from './Mensaje';

/**
 * Lista con formulario para crear, editar y eliminar registros de un endpoint REST.
 * campos: [{ nombre, etiqueta, tipo: 'text'|'number'|'datetime-local'|'select', opciones: [[valor, texto]] }]
 */
export default function Gestion({ titulo, descripcion, ruta, campos, mostrar, editable = true, eliminable = true, acciones, alGuardar, nombreNuevo = 'Nuevo', resumen }) {
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
    setAviso('');
    setEditando(item?.id || null);
    setForm(item ? Object.fromEntries(campos.map((c) => [c.nombre, c.desde ? c.desde(item) : item[c.nombre] ?? ''])) : vacio);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="gestion-cabeza">
        <div>
          <h2>{titulo}</h2>
          {descripcion && <p className="tenue pequeño">{descripcion}</p>}
        </div>
        {!form && <button className="boton" onClick={() => abrir(null)}><Icono nombre="mas" tam={18} /> {nombreNuevo}</button>}
      </div>
      <Exito texto={aviso} />
      {!form && <Error texto={error} />}
      {form && (
        <form className="tarjeta form-gestion" onSubmit={guardar}>
          <div className="fila" style={{ marginBottom: 'var(--e4)' }}>
            <h3>{editando ? 'Editar registro' : nombreNuevo}</h3>
            <button type="button" className="boton fantasma pequeño" aria-label="Cerrar" onClick={() => setForm(null)}><Icono nombre="cerrar" tam={18} /></button>
          </div>
          <div className="rejilla-form dos">
            {campos.map((c) => (
              <div key={c.nombre} className="campo">
                <label htmlFor={`campo-${c.nombre}`}>{c.etiqueta}</label>
                {c.tipo === 'select' ? (
                  <select id={`campo-${c.nombre}`} value={form[c.nombre]} onChange={(e) => setForm({ ...form, [c.nombre]: e.target.value })} required>
                    <option value="">Seleccione…</option>
                    {c.opciones.map(([valor, texto]) => <option key={valor} value={valor}>{texto}</option>)}
                  </select>
                ) : (
                  <input id={`campo-${c.nombre}`} type={c.tipo || 'text'} value={form[c.nombre]}
                    onChange={(e) => setForm({ ...form, [c.nombre]: e.target.value })} required={c.requerido !== false} />
                )}
              </div>
            ))}
          </div>
          <Error texto={error} />
          <div className="acciones-form">
            <button type="button" className="boton secundario" onClick={() => setForm(null)}>Cancelar</button>
            <button className="boton">{editando ? 'Guardar cambios' : 'Guardar'}</button>
          </div>
        </form>
      )}
      {items && resumen?.(items)}
      {!items && !error && <Cargando />}
      {items?.length === 0 && <div className="tarjeta"><Vacio icono="panel" titulo="Todavía no hay registros" texto={`Usa “${nombreNuevo}” para crear el primero.`} /></div>}
      <div className="registros">
        {items?.map((item) => (
          <div key={item.id} className="tarjeta compacta registro">
            {mostrar(item)}
            {(editable || eliminable || acciones) && (
              <div className="acciones">
                {acciones?.(item, accion)}
                {editable && <button className="boton fantasma pequeño" onClick={() => abrir(item)}><Icono nombre="editar" tam={16} /> Editar</button>}
                {eliminable && <button className="boton fantasma pequeño" style={{ color: 'var(--error)' }} onClick={() => eliminar(item)}><Icono nombre="borrar" tam={16} /> Eliminar</button>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
