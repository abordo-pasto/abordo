package com.abordo.dto;

import java.util.List;

/** HU_009: estado de cada asiento de una salida. */
public record AsientosResponse(String salidaId, int capacidad, int libres, List<Asiento> asientos) {

    public record Asiento(int numero, boolean ocupado) {
    }
}
