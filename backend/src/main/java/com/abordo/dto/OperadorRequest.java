package com.abordo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OperadorRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "El correo es obligatorio") @Email(message = "El correo no es válido") String correo,
        @NotBlank(message = "La contraseña es obligatoria") @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres") String contrasena,
        @NotBlank(message = "La empresa es obligatoria") String empresaId) {
}
