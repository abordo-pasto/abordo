package com.abordo.exception;

/** Credenciales incorrectas o cuenta desactivada. Responde 401. */
public class NoAutorizadoException extends RuntimeException {
    public NoAutorizadoException(String mensaje) {
        super(mensaje);
    }
}
