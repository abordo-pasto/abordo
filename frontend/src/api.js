// Cliente de la API de Abordo. Agrega el token JWT si hay sesión.
const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function api(ruta, { metodo = 'GET', cuerpo } = {}) {
  const token = localStorage.getItem('abordo.token');
  const respuesta = await fetch(URL_API + ruta, {
    method: metodo,
    headers: {
      ...(cuerpo ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  if (respuesta.status === 204) return null;
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const detalle = datos?.detalles?.length ? ` (${datos.detalles.join(', ')})` : '';
    throw new Error((datos?.mensaje || 'Ocurrió un error') + detalle);
  }
  return datos;
}

export const pesos = (valor) => '$' + Math.round(valor).toLocaleString('es-CO');

export const hora = (fechaHora) => fechaHora?.slice(11, 16);

export const fechaCorta = (fechaHora) => {
  const [a, m, d] = fechaHora.slice(0, 10).split('-');
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${Number(d)} ${meses[Number(m) - 1]} ${a}`;
};

export const hoyISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export const SERVICIO = { BASICO: 'Básico', PREFERENCIAL: 'Preferencial', DOS_PISOS: 'Dos pisos' };
export const TIPO_PASAJERO = { GENERAL: 'General', ESTUDIANTE: 'Estudiante', ADULTO_MAYOR: 'Adulto mayor' };
export const ESTADO_TIQUETE = { ACTIVO: 'Activo', CANCELADO: 'Cancelado', USADO: 'Usado' };

export const duracion = (minutos) => {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`;
};

// "lunes 24 de noviembre" a partir de "2026-11-24"
export const fechaLarga = (fechaISO) => {
  const [a, m, d] = fechaISO.slice(0, 10).split('-').map(Number);
  return new Date(a, m - 1, d).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Color estable por empresa para identificarla en listas
const COLORES_EMPRESA = ['#0a57a4', '#e0a800', '#15803d', '#c2410c', '#7c3aed', '#0e7490'];
export const colorEmpresa = (nombre = '') =>
  COLORES_EMPRESA[[...nombre].reduce((suma, c) => suma + c.charCodeAt(0), 0) % COLORES_EMPRESA.length];
