package com.abordo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record RutaRequest(
        @NotBlank(message = "El destino es obligatorio") String destino,
        @Positive(message = "La duración debe ser mayor que 0") int duracionMinutos,
        @NotBlank(message = "El punto de transporte de salida es obligatorio") String puntoTransporteId) {
}
