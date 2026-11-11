package com.abordo.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.abordo.exception.AccesoDenegadoException;
import com.abordo.model.OperadorEmpresa;
import com.abordo.model.Pasajero;
import com.abordo.model.Usuario;

/** Da acceso al usuario que hizo la petición (el que venía en el token). */
@Component
public class UsuarioActual {

    public Usuario obtener() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof Usuario usuario)) {
            throw new AccesoDenegadoException("Debe iniciar sesión");
        }
        return usuario;
    }

    public OperadorEmpresa operador() {
        if (obtener() instanceof OperadorEmpresa operador) {
            return operador;
        }
        throw new AccesoDenegadoException("Solo un operador de empresa puede hacer esta operación");
    }

    public Pasajero pasajero() {
        if (obtener() instanceof Pasajero pasajero) {
            return pasajero;
        }
        throw new AccesoDenegadoException("Solo un pasajero puede hacer esta operación");
    }
}
