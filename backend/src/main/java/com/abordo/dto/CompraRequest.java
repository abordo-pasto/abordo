package com.abordo.dto;

import com.abordo.model.TipoPasajero;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CompraRequest(
        @NotBlank(message = "La salida es obligatoria") String salidaId,
        @Min(value = 1, message = "El número de asiento debe ser mayor que 0") int numeroAsiento,
        @NotNull(message = "El tipo de pasajero es obligatorio") TipoPasajero tipoPasajero,
        @NotBlank(message = "El número de tarjeta es obligatorio") String numeroTarjeta) {
}
