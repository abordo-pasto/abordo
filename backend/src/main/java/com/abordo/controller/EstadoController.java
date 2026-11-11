package com.abordo.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** Para comprobar que la API está arriba (lo usa el despliegue para mantenerla activa). */
@RestController
public class EstadoController {

    @GetMapping({"/", "/api/estado"})
    public Map<String, String> estado() {
        return Map.of("aplicacion", "Abordo", "estado", "activo", "documentacion", "/swagger-ui.html");
    }
}
