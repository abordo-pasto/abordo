package com.abordo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.abordo.dto.LoginRequest;
import com.abordo.dto.LoginResponse;
import com.abordo.dto.RegistroRequest;
import com.abordo.dto.UsuarioResponse;
import com.abordo.security.UsuarioActual;
import com.abordo.service.AuthServicio;

import jakarta.validation.Valid;

/** Controlador (GRASP): recibe la petición HTTP y delega en el servicio. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServicio authServicio;
    private final UsuarioActual usuarioActual;

    public AuthController(AuthServicio authServicio, UsuarioActual usuarioActual) {
        this.authServicio = authServicio;
        this.usuarioActual = usuarioActual;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse registrar(@Valid @RequestBody RegistroRequest datos) {
        return authServicio.registrar(datos);
    }

    @PostMapping("/login")
    public LoginResponse iniciarSesion(@Valid @RequestBody LoginRequest datos) {
        return authServicio.iniciarSesion(datos);
    }

    @GetMapping("/yo")
    public UsuarioResponse yo() {
        return UsuarioResponse.desde(usuarioActual.obtener());
    }
}
