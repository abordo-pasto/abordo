package com.abordo.dto;

import java.time.LocalDateTime;
import java.util.List;

/** Formato único de los errores (RNF_006). */
public record ErrorResponse(int estado, String error, String mensaje, List<String> detalles, LocalDateTime fecha) {

    public static ErrorResponse de(int estado, String error, String mensaje) {
        return new ErrorResponse(estado, error, mensaje, List.of(), LocalDateTime.now());
    }
}
