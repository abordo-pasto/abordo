package com.abordo.dto;

import com.abordo.model.PuntoTransporte;

public record PuntoTransporteResponse(String id, String nombre, String direccion, String horarioAtencion,
                                      String zonaQueAtiende) {

    public static PuntoTransporteResponse desde(PuntoTransporte p) {
        return new PuntoTransporteResponse(p.getId(), p.getNombre(), p.getDireccion(), p.getHorarioAtencion(),
                p.getZonaQueAtiende());
    }
}
