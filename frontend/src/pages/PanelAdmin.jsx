import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api';
import Encabezado from '../components/Encabezado';
import Gestion from '../components/Gestion';
import Pestanas from '../components/Pestanas';
import Ventas from '../components/Ventas';
import { useSesion } from '../sesion';

// HU_013 Puntos, HU_003 Empresas, HU_016 Operadores y HU_007 Ventas de todas las empresas
export default function PanelAdmin() {
  const { usuario } = useSesion();
  const [pestana, setPestana] = useState('Puntos');
  const [empresas, setEmpresas] = useState([]);

  const recargar = () => api('/api/empresas').then(setEmpresas).catch(() => {});
  useEffect(() => { recargar(); }, []);

  if (usuario?.rol !== 'ADMINISTRADOR') return <Navigate to="/cuenta" />;

  return (
    <>
      <Encabezado titulo="Administración" />
      <section className="pagina">
        <Pestanas opciones={['Puntos', 'Empresas', 'Operadores', 'Ventas']} activa={pestana} cambiar={setPestana} />

        {pestana === 'Puntos' && (
          <Gestion ruta="/api/puntos" nombreNuevo="Nuevo punto"
            campos={[
              { nombre: 'nombre', etiqueta: 'Nombre' },
              { nombre: 'direccion', etiqueta: 'Dirección' },
              { nombre: 'horarioAtencion', etiqueta: 'Horario de atención' },
              { nombre: 'zonaQueAtiende', etiqueta: 'Zona que atiende', requerido: false },
            ]}
            mostrar={(p) => (<><strong>{p.nombre}</strong><span className="tenue">{p.direccion}</span><span className="tenue">{p.horarioAtencion}</span></>)}
          />
        )}

        {pestana === 'Empresas' && (
          <Gestion ruta="/api/empresas" nombreNuevo="Nueva empresa" alGuardar={recargar}
            campos={[
              { nombre: 'nombre', etiqueta: 'Nombre' },
              { nombre: 'nit', etiqueta: 'NIT' },
              { nombre: 'telefono', etiqueta: 'Teléfono' },
            ]}
            mostrar={(e) => (<><strong>{e.nombre}</strong><span className="tenue">NIT {e.nit} · Tel. {e.telefono}</span></>)}
          />
        )}

        {pestana === 'Operadores' && (
          <Gestion ruta="/api/operadores" nombreNuevo="Nuevo operador" editable={false} eliminable={false}
            campos={[
              { nombre: 'nombre', etiqueta: 'Nombre' },
              { nombre: 'correo', etiqueta: 'Correo', tipo: 'email' },
              { nombre: 'contrasena', etiqueta: 'Contraseña inicial', tipo: 'password' },
              { nombre: 'empresaId', etiqueta: 'Empresa', tipo: 'select', opciones: empresas.map((e) => [e.id, e.nombre]) },
            ]}
            mostrar={(o) => (
              <>
                <div className="fila"><strong>{o.nombre}</strong><span className={`insignia ${o.activo ? 'verde' : 'gris'}`}>{o.activo ? 'Activo' : 'Inactivo'}</span></div>
                <span className="tenue">{o.correo} · {o.empresa}</span>
              </>
            )}
            acciones={(o, accion) => (
              <button className="enlace" onClick={() => accion(async () => {
                await api(`/api/operadores/${o.id}/${o.activo ? 'desactivar' : 'reactivar'}`, { metodo: 'PUT' });
                return o.activo ? 'Operador desactivado.' : 'Operador reactivado.';
              })}>
                {o.activo ? 'Desactivar' : 'Reactivar'}
              </button>
            )}
          />
        )}

        {pestana === 'Ventas' && <Ventas />}
      </section>
    </>
  );
}
