package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.RutaRequest;
import com.abordo.dto.RutaResponse;
import com.abordo.service.RutaServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rutas")
public class RutaController {

    private final RutaServicio servicio;

    public RutaController(RutaServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<RutaResponse> listar() {
        return servicio.listarMiEmpresa();
    }

    @GetMapping("/destinos")
    public List<String> destinos() {
        return servicio.destinos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RutaResponse crear(@Valid @RequestBody RutaRequest datos) {
        return servicio.crear(datos);
    }

    @PutMapping("/{id}")
    public RutaResponse actualizar(@PathVariable String id, @Valid @RequestBody RutaRequest datos) {
        return servicio.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable String id) {
        servicio.eliminar(id);
    }
}
