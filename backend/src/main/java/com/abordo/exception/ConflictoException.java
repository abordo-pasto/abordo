package com.abordo.exception;

/** Se lanza cuando el dato ya existe o está en uso (correo, NIT, placa, asiento). Responde 409. */
public class ConflictoException extends RuntimeException {
    public ConflictoException(String mensaje) {
        super(mensaje);
    }
}
