package com.abordo.exception;

/** Se lanza cuando un operador intenta tocar datos de otra empresa (RN9). Responde 403. */
public class AccesoDenegadoException extends RuntimeException {
    public AccesoDenegadoException(String mensaje) {
        super(mensaje);
    }
}
