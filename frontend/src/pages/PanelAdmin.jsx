import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, colorEmpresa } from '../api';
import { CabezaPanel } from '../components/Encabezado';
import Gestion from '../components/Gestion';
import Icono from '../components/Icono';
import Pestanas from '../components/Pestanas';
import Ventas from '../components/Ventas';
import { useSesion } from '../sesion';

const PESTANAS = [
  { texto: 'Puntos', icono: 'edificio' },
  { texto: 'Empresas', icono: 'bus' },
  { texto: 'Operadores', icono: 'usuarios' },
  { texto: 'Ventas', icono: 'grafico' },
];

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
      <CabezaPanel antetitulo="Administrador" titulo="Panel de administración"
        subtitulo="Gestiona los puntos de transporte, las empresas, sus operadores y el reporte de ventas de todo el sistema." />
      <div className="contenedor pagina">
        <div className="diseno-panel">
          <Pestanas opciones={PESTANAS} activa={pestana} cambiar={setPestana} />
          <div>
            {pestana === 'Puntos' && (
              <Gestion titulo="Puntos de transporte" descripcion="Las terminales de Pasto desde donde salen las rutas." ruta="/api/puntos" nombreNuevo="Nuevo punto"
                campos={[
                  { nombre: 'nombre', etiqueta: 'Nombre' },
                  { nombre: 'direccion', etiqueta: 'Dirección' },
                  { nombre: 'horarioAtencion', etiqueta: 'Horario de atención' },
                  { nombre: 'zonaQueAtiende', etiqueta: 'Zona que atiende', requerido: false },
                ]}
                mostrar={(p) => (
                  <>
                    <strong style={{ color: 'var(--tinta)' }}>{p.nombre}</strong>
                    <span className="punto-dato"><Icono nombre="pin" tam={16} /> {p.direccion}</span>
                    <span className="punto-dato"><Icono nombre="reloj" tam={16} /> {p.horarioAtencion}</span>
                  </>
                )}
              />
            )}

            {pestana === 'Empresas' && (
              <Gestion titulo="Empresas transportadoras" descripcion="Cada empresa tiene sus buses, rutas y operadores." ruta="/api/empresas" nombreNuevo="Nueva empresa" alGuardar={recargar}
                campos={[
                  { nombre: 'nombre', etiqueta: 'Nombre' },
                  { nombre: 'nit', etiqueta: 'NIT' },
                  { nombre: 'telefono', etiqueta: 'Teléfono' },
                ]}
                mostrar={(e) => (
                  <>
                    <strong className="salida-empresa"><i className="marca-empresa" style={{ background: colorEmpresa(e.nombre) }} /> {e.nombre}</strong>
                    <span className="tenue pequeño">NIT {e.nit}</span>
                    <span className="tenue pequeño">Tel. {e.telefono}</span>
                  </>
                )}
              />
            )}

            {pestana === 'Operadores' && (
              <Gestion titulo="Operadores de empresa" descripcion="Un operador solo ve y cambia los datos de su empresa." ruta="/api/operadores" nombreNuevo="Nuevo operador" editable={false} eliminable={false}
                campos={[
                  { nombre: 'nombre', etiqueta: 'Nombre' },
                  { nombre: 'correo', etiqueta: 'Correo', tipo: 'email' },
                  { nombre: 'contrasena', etiqueta: 'Contraseña inicial', tipo: 'password' },
                  { nombre: 'empresaId', etiqueta: 'Empresa', tipo: 'select', opciones: empresas.map((e) => [e.id, e.nombre]) },
                ]}
                mostrar={(o) => (
                  <div className="perfil" style={{ gap: 'var(--e3)' }}>
                    <span className="avatar" style={{ width: 40, height: 40, fontSize: '1rem' }}>{o.nombre[0]}</span>
                    <div className="pila" style={{ gap: 2, minWidth: 0 }}>
                      <div className="fila"><strong style={{ color: 'var(--tinta)' }}>{o.nombre}</strong><span className={`insignia ${o.activo ? 'verde' : 'gris'}`}>{o.activo ? 'Activo' : 'Inactivo'}</span></div>
                      <span className="tenue pequeño" style={{ overflowWrap: 'anywhere' }}>{o.correo}</span>
                      <span className="tenue pequeño">{o.empresa}</span>
                    </div>
                  </div>
                )}
                acciones={(o, accion) => (
                  <button className="boton fantasma pequeño" onClick={() => accion(async () => {
                    await api(`/api/operadores/${o.id}/${o.activo ? 'desactivar' : 'reactivar'}`, { metodo: 'PUT' });
                    return o.activo ? 'Operador desactivado.' : 'Operador reactivado.';
                  })}>
                    {o.activo ? 'Desactivar' : 'Reactivar'}
                  </button>
                )}
              />
            )}

            {pestana === 'Ventas' && <Ventas />}
          </div>
        </div>
      </div>
    </>
  );
}
