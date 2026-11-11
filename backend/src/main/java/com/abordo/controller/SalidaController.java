package com.abordo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.abordo.dto.AsientosResponse;
import com.abordo.dto.ComparacionResponse;
import com.abordo.dto.SalidaRequest;
import com.abordo.dto.SalidaResponse;
import com.abordo.model.TipoPasajero;
import com.abordo.service.SalidaServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/salidas")
public class SalidaController {

    private final SalidaServicio servicio;

    public SalidaController(SalidaServicio servicio) {
        this.servicio = servicio;
    }

    /** HU_008. Ejemplo: /api/salidas/buscar?destino=Ipiales&fecha=2026-11-18&orden=precio */
    @GetMapping("/buscar")
    public List<SalidaResponse> buscar(@RequestParam String destino,
                                       @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
                                       @RequestParam(required = false) String puntoId,
                                       @RequestParam(defaultValue = "hora") String orden) {
        return servicio.buscarSalidas(destino, fecha, puntoId, orden);
    }

    /** HU_015. Ejemplo: /api/salidas/comparar?ids=a,b,c&tipoPasajero=ESTUDIANTE */
    @GetMapping("/comparar")
    public ComparacionResponse comparar(@RequestParam List<String> ids,
                                        @RequestParam(required = false) TipoPasajero tipoPasajero) {
        return servicio.comparar(ids, tipoPasajero);
    }

    /** HU_009 */
    @GetMapping("/{id}/asientos")
    public AsientosResponse asientos(@PathVariable String id) {
        return servicio.asientos(id);
    }

    /** HU_006: salidas de la empresa del operador. */
    @GetMapping
    public List<SalidaResponse> listarMiEmpresa() {
        return servicio.listarMiEmpresa();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SalidaResponse programar(@Valid @RequestBody SalidaRequest datos) {
        return servicio.programar(datos);
    }

    @PutMapping("/{id}/cancelar")
    public SalidaResponse cancelar(@PathVariable String id) {
        return servicio.cancelar(id);
    }
}
