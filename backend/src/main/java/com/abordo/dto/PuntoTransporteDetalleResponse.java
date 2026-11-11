package com.abordo.dto;

import java.util.List;

/** HU_014: un punto de transporte con las empresas que salen de él y sus destinos. */
public record PuntoTransporteDetalleResponse(PuntoTransporteResponse punto, List<String> empresas,
                                             List<String> destinos) {
}
