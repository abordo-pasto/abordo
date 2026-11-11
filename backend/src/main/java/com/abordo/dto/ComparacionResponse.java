package com.abordo.dto;

import java.util.List;
import java.util.Map;

import com.abordo.model.TipoPasajero;

/** HU_015: comparación de salidas con el precio final por tipo de pasajero. */
public record ComparacionResponse(String destino, TipoPasajero tipoPasajero, String masBarataId, String masRapidaId,
                                  List<Opcion> opciones) {

    public record Opcion(SalidaResponse salida, Map<TipoPasajero, Double> preciosFinales,
                         boolean masBarata, boolean masRapida) {
    }
}
