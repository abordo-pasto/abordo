package com.abordo.dto;

import java.time.LocalDate;
import java.util.List;

import com.abordo.model.LineaReporte;
import com.abordo.model.ReporteVentas;

public record ReporteVentasResponse(LocalDate desde, LocalDate hasta, List<LineaReporte> lineas,
                                    int totalTiquetes, double totalRecaudado) {

    public static ReporteVentasResponse desde(ReporteVentas r) {
        return new ReporteVentasResponse(r.getDesde(), r.getHasta(), r.getLineas(), r.totalTiquetes(), r.totalRecaudado());
    }
}
