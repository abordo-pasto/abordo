package com.abordo.dto;

import java.time.LocalDateTime;

import com.abordo.model.Salida;
import com.abordo.model.TipoServicio;

public record SalidaResponse(String id, String destino, String puntoTransporte, String empresa,
                             LocalDateTime fechaHora, LocalDateTime horaEstimadaLlegada, int duracionMinutos,
                             double precioBase, int asientosLibres, int capacidad, String placaBus,
                             TipoServicio tipoServicio, boolean cancelada) {

    public static SalidaResponse desde(Salida s) {
        return new SalidaResponse(s.getId(), s.getRuta().getDestino(), s.getRuta().getPuntoTransporte().getNombre(),
                s.getRuta().getEmpresa().getNombre(), s.getFechaHora(), s.horaEstimadaLlegada(),
                s.getRuta().getDuracionMinutos(), s.getPrecioBase(), s.asientosLibres(), s.getBus().getCapacidad(),
                s.getBus().getPlaca(), s.getBus().getTipoServicio(), s.isCancelada());
    }
}
