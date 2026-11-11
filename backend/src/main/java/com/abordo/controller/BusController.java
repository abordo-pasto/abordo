package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.BusRequest;
import com.abordo.dto.BusResponse;
import com.abordo.service.BusServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    private final BusServicio servicio;

    public BusController(BusServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<BusResponse> listar() {
        return servicio.listarMiEmpresa();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BusResponse crear(@Valid @RequestBody BusRequest datos) {
        return servicio.crear(datos);
    }

    @PutMapping("/{id}")
    public BusResponse actualizar(@PathVariable String id, @Valid @RequestBody BusRequest datos) {
        return servicio.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable String id) {
        servicio.eliminar(id);
    }
}
