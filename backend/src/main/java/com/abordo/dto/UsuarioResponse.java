package com.abordo.dto;

import com.abordo.model.OperadorEmpresa;
import com.abordo.model.Rol;
import com.abordo.model.Usuario;

/** Datos públicos de un usuario. Nunca devuelve la contraseña. */
public record UsuarioResponse(String id, String nombre, String correo, Rol rol, boolean activo,
                              String empresaId, String empresa) {

    public static UsuarioResponse desde(Usuario u) {
        String empresaId = null;
        String empresa = null;
        if (u instanceof OperadorEmpresa op && op.getEmpresa() != null) {
            empresaId = op.getEmpresa().getId();
            empresa = op.getEmpresa().getNombre();
        }
        return new UsuarioResponse(u.getId(), u.getNombre(), u.getCorreo(), u.getRol(), u.isActivo(), empresaId, empresa);
    }
}
