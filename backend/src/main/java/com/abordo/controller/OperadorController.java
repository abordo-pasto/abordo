package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.OperadorRequest;
import com.abordo.dto.UsuarioResponse;
import com.abordo.service.OperadorServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/operadores")
public class OperadorController {

    private final OperadorServicio servicio;

    public OperadorController(OperadorServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<UsuarioResponse> listar() {
        return servicio.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse crear(@Valid @RequestBody OperadorRequest datos) {
        return servicio.crear(datos);
    }

    @PutMapping("/{id}/desactivar")
    public UsuarioResponse desactivar(@PathVariable String id) {
        return servicio.cambiarEstado(id, false);
    }

    @PutMapping("/{id}/reactivar")
    public UsuarioResponse reactivar(@PathVariable String id) {
        return servicio.cambiarEstado(id, true);
    }
}
