package com.abordo.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.abordo.dto.OperadorRequest;
import com.abordo.dto.UsuarioResponse;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.model.EmpresaTransportadora;
import com.abordo.model.OperadorEmpresa;
import com.abordo.model.Rol;
import com.abordo.repository.UsuarioRepository;

/** HU_016 Gestionar operadores de empresa. */
@Service
public class OperadorServicio {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaServicio empresaServicio;
    private final PasswordEncoder codificador;

    public OperadorServicio(UsuarioRepository usuarioRepository, EmpresaServicio empresaServicio, PasswordEncoder codificador) {
        this.usuarioRepository = usuarioRepository;
        this.empresaServicio = empresaServicio;
        this.codificador = codificador;
    }

    public List<UsuarioResponse> listar() {
        return usuarioRepository.findByRol(Rol.OPERADOR).stream().map(UsuarioResponse::desde).toList();
    }

    public UsuarioResponse crear(OperadorRequest datos) {
        String correo = datos.correo().trim().toLowerCase();
        if (usuarioRepository.existsByCorreoIgnoreCase(correo)) {
            throw new ConflictoException("Ya existe una cuenta con el correo " + correo);
        }
        EmpresaTransportadora empresa = empresaServicio.buscar(datos.empresaId());
        OperadorEmpresa operador = new OperadorEmpresa(datos.nombre().trim(), correo,
                codificador.encode(datos.contrasena()), empresa);
        return UsuarioResponse.desde(usuarioRepository.save(operador));
    }

    public UsuarioResponse cambiarEstado(String id, boolean activo) {
        OperadorEmpresa operador = usuarioRepository.findById(id)
                .filter(u -> u instanceof OperadorEmpresa)
                .map(u -> (OperadorEmpresa) u)
                .orElseThrow(() -> new NoEncontradoException("No existe el operador " + id));
        if (activo) {
            operador.reactivar();
        } else {
            operador.desactivar();
        }
        return UsuarioResponse.desde(usuarioRepository.save(operador));
    }
}
