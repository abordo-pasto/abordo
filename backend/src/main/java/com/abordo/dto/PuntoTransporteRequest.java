package com.abordo.dto;

import jakarta.validation.constraints.NotBlank;

public record PuntoTransporteRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "La dirección es obligatoria") String direccion,
        @NotBlank(message = "El horario de atención es obligatorio") String horarioAtencion,
        String zonaQueAtiende) {
}
