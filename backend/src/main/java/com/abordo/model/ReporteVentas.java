package com.abordo.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Tiquetes vendidos y valor recaudado por empresa en un rango de fechas (HU_007). */
public class ReporteVentas {

    private final LocalDate desde;
    private final LocalDate hasta;
    private final List<LineaReporte> lineas;

    /** Creador: el reporte crea sus líneas (composición). Los tiquetes cancelados no cuentan. */
    public ReporteVentas(LocalDate desde, LocalDate hasta, Collection<Tiquete> tiquetes) {
        this.desde = desde;
        this.hasta = hasta;
        Map<String, LineaReporte> porEmpresa = new LinkedHashMap<>();
        for (Tiquete t : tiquetes) {
            if (t.getEstado() == EstadoTiquete.CANCELADO) {
                continue;
            }
            String empresa = t.getSalida().getRuta().getEmpresa().getNombre();
            porEmpresa.computeIfAbsent(empresa, LineaReporte::new).agregar(t);
        }
        this.lineas = new ArrayList<>(porEmpresa.values());
        this.lineas.sort(Comparator.comparingDouble(LineaReporte::getTotalRecaudado).reversed());
    }

    public double totalRecaudado() {
        return lineas.stream().mapToDouble(LineaReporte::getTotalRecaudado).sum();
    }

    public int totalTiquetes() {
        return lineas.stream().mapToInt(LineaReporte::getCantidadTiquetes).sum();
    }

    public LocalDate getDesde() { return desde; }
    public LocalDate getHasta() { return hasta; }
    public List<LineaReporte> getLineas() { return lineas; }
}
