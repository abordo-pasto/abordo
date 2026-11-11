package com.abordo.dto;

import java.time.LocalDateTime;

import com.abordo.model.EstadoTiquete;
import com.abordo.model.Tiquete;
import com.abordo.model.TipoPasajero;

public record TiqueteResponse(String id, String codigo, EstadoTiquete estado, int numeroAsiento,
                              TipoPasajero tipoPasajero, double precioFinal, LocalDateTime fechaCompra,
                              boolean puedeCancelarse, SalidaResponse salida) {

    public static TiqueteResponse desde(Tiquete t, LocalDateTime ahora) {
        return new TiqueteResponse(t.getId(), t.getCodigo(), t.getEstado(), t.getNumeroAsiento(), t.getTipoPasajero(),
                t.getPrecioFinal(), t.getFechaCompra(), t.puedeCancelarse(ahora), SalidaResponse.desde(t.getSalida()));
    }
}
