package com.abordo.dto;

import com.abordo.model.TipoServicio;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BusRequest(
        @NotBlank(message = "La placa es obligatoria") String placa,
        @Min(value = 10, message = "La capacidad mínima es 10") @Max(value = 45, message = "La capacidad máxima es 45") int capacidad,
        @NotNull(message = "El tipo de servicio es obligatorio") TipoServicio tipoServicio) {
}
