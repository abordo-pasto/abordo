package com.abordo.dto;

import com.abordo.model.Ruta;

public record RutaResponse(String id, String destino, int duracionMinutos, String puntoTransporteId,
                           String puntoTransporte, String empresa) {

    public static RutaResponse desde(Ruta r) {
        return new RutaResponse(r.getId(), r.getDestino(), r.getDuracionMinutos(), r.getPuntoTransporte().getId(),
                r.getPuntoTransporte().getNombre(), r.getEmpresa().getNombre());
    }
}
