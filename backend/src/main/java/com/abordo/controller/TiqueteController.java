package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.CompraRequest;
import com.abordo.dto.TiqueteResponse;
import com.abordo.model.EstadoTiquete;
import com.abordo.service.TiqueteServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tiquetes")
public class TiqueteController {

    private final TiqueteServicio servicio;

    public TiqueteController(TiqueteServicio servicio) {
        this.servicio = servicio;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TiqueteResponse comprar(@Valid @RequestBody CompraRequest datos) {
        return servicio.comprar(datos);
    }

    @GetMapping
    public List<TiqueteResponse> misTiquetes(@RequestParam(required = false) EstadoTiquete estado) {
        return servicio.misTiquetes(estado);
    }

    @PutMapping("/{id}/cancelar")
    public TiqueteResponse cancelar(@PathVariable String id) {
        return servicio.cancelar(id);
    }
}
