package com.abordo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.abordo.dto.LoginRequest;
import com.abordo.dto.LoginResponse;
import com.abordo.dto.RegistroRequest;
import com.abordo.dto.UsuarioResponse;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoAutorizadoException;
import com.abordo.model.Pasajero;
import com.abordo.model.Usuario;
import com.abordo.repository.UsuarioRepository;
import com.abordo.security.JwtServicio;

/** HU_001 Registrarse y HU_002 Iniciar sesión. */
@Service
public class AuthServicio {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder codificador;
    private final JwtServicio jwtServicio;

    public AuthServicio(UsuarioRepository usuarioRepository, PasswordEncoder codificador, JwtServicio jwtServicio) {
        this.usuarioRepository = usuarioRepository;
        this.codificador = codificador;
        this.jwtServicio = jwtServicio;
    }

    public UsuarioResponse registrar(RegistroRequest datos) {
        String correo = datos.correo().trim().toLowerCase();
        if (usuarioRepository.existsByCorreoIgnoreCase(correo)) {
            throw new ConflictoException("Ya existe una cuenta con el correo " + correo);
        }
        Pasajero pasajero = new Pasajero(datos.nombre().trim(), correo,
                codificador.encode(datos.contrasena()), datos.documento().trim());
        return UsuarioResponse.desde(usuarioRepository.save(pasajero));
    }

    public LoginResponse iniciarSesion(LoginRequest datos) {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(datos.correo().trim())
                .filter(u -> u.verificarContrasena(datos.contrasena(), codificador))
                .orElseThrow(() -> new NoAutorizadoException("Correo o contraseña incorrectos"));
        if (!usuario.isActivo()) {
            throw new NoAutorizadoException("La cuenta está desactivada");
        }
        return new LoginResponse(jwtServicio.generarToken(usuario), UsuarioResponse.desde(usuario));
    }
}
