import { createContext, useContext, useState } from 'react';
import { api } from './api';

// Guarda el usuario con sesión y las salidas marcadas para comparar.
const Contexto = createContext(null);

function leerUsuario() {
  try {
    return JSON.parse(localStorage.getItem('abordo.usuario'));
  } catch {
    return null;
  }
}

export function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState(leerUsuario);
  const [comparar, setComparar] = useState([]);

  async function iniciarSesion(correo, contrasena) {
    const { token, usuario } = await api('/api/auth/login', { metodo: 'POST', cuerpo: { correo, contrasena } });
    localStorage.setItem('abordo.token', token);
    localStorage.setItem('abordo.usuario', JSON.stringify(usuario));
    setUsuario(usuario);
    return usuario;
  }

  function cerrarSesion() {
    localStorage.removeItem('abordo.token');
    localStorage.removeItem('abordo.usuario');
    setUsuario(null);
  }

  // Se comparan de 2 a 4 salidas al mismo destino
  function alternarComparar(salida) {
    setComparar((lista) => {
      if (lista.some((s) => s.id === salida.id)) return lista.filter((s) => s.id !== salida.id);
      const mismoDestino = lista.filter((s) => s.destino === salida.destino);
      return [...mismoDestino, salida].slice(-4);
    });
  }

  return (
    <Contexto.Provider value={{ usuario, iniciarSesion, cerrarSesion, comparar, alternarComparar, setComparar }}>
      {children}
    </Contexto.Provider>
  );
}

export const useSesion = () => useContext(Contexto);
