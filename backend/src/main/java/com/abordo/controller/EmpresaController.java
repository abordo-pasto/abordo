package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.EmpresaRequest;
import com.abordo.dto.EmpresaResponse;
import com.abordo.service.EmpresaServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaServicio servicio;

    public EmpresaController(EmpresaServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<EmpresaResponse> listar() {
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public EmpresaResponse obtener(@PathVariable String id) {
        return EmpresaResponse.desde(servicio.buscar(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmpresaResponse crear(@Valid @RequestBody EmpresaRequest datos) {
        return servicio.crear(datos);
    }

    @PutMapping("/{id}")
    public EmpresaResponse actualizar(@PathVariable String id, @Valid @RequestBody EmpresaRequest datos) {
        return servicio.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable String id) {
        servicio.eliminar(id);
    }
}
