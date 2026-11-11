package com.abordo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record EmpresaRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "El NIT es obligatorio") @Pattern(regexp = "[0-9-]{6,15}", message = "El NIT solo puede tener números y guion") String nit,
        @NotBlank(message = "El teléfono es obligatorio") String telefono) {
}
