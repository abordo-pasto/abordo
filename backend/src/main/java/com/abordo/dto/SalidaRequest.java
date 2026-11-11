package com.abordo.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SalidaRequest(
        @NotBlank(message = "La ruta es obligatoria") String rutaId,
        @NotBlank(message = "El bus es obligatorio") String busId,
        @NotNull(message = "La fecha y hora son obligatorias") @Future(message = "La salida debe ser en el futuro") LocalDateTime fechaHora,
        @Positive(message = "El precio base debe ser mayor que 0") double precioBase) {
}
