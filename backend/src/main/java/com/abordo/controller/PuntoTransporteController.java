package com.abordo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.PuntoTransporteDetalleResponse;
import com.abordo.dto.PuntoTransporteRequest;
import com.abordo.dto.PuntoTransporteResponse;
import com.abordo.service.PuntoTransporteServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/puntos")
public class PuntoTransporteController {

    private final PuntoTransporteServicio servicio;

    public PuntoTransporteController(PuntoTransporteServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<PuntoTransporteResponse> listar() {
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public PuntoTransporteDetalleResponse detalle(@PathVariable String id) {
        return servicio.detalle(id);
    }

    @GetMapping("/hacia")
    public List<PuntoTransporteResponse> puntosHacia(@RequestParam String destino) {
        return servicio.puntosHacia(destino);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PuntoTransporteResponse crear(@Valid @RequestBody PuntoTransporteRequest datos) {
        return servicio.crear(datos);
    }

    @PutMapping("/{id}")
    public PuntoTransporteResponse actualizar(@PathVariable String id, @Valid @RequestBody PuntoTransporteRequest datos) {
        return servicio.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable String id) {
        servicio.eliminar(id);
    }
}
