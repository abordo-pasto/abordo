package com.abordo.exception;

/** Se lanza cuando no existe el registro pedido. Responde 404. */
public class NoEncontradoException extends RuntimeException {
    public NoEncontradoException(String mensaje) {
        super(mensaje);
    }
}
