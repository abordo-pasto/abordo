package com.abordo.exception;

/** Se lanza cuando una petición rompe una regla de negocio. Responde 400. */
public class ReglaNegocioException extends RuntimeException {
    public ReglaNegocioException(String mensaje) {
        super(mensaje);
    }
}
