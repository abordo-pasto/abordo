package com.abordo.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abordo.dto.ReporteVentasResponse;
import com.abordo.service.ReporteServicio;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    private final ReporteServicio servicio;

    public ReporteController(ReporteServicio servicio) {
        this.servicio = servicio;
    }

    /** HU_007. Ejemplo: /api/reportes/ventas?desde=2026-11-01&hasta=2026-11-30 */
    @GetMapping("/ventas")
    public ReporteVentasResponse ventas(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return servicio.ventas(desde, hasta);
    }
}
