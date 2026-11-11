package com.abordo.exception;

/** La pasarela de pagos no aprobó el pago (RN10). Responde 402. */
public class PagoRechazadoException extends RuntimeException {
    public PagoRechazadoException(String mensaje) {
        super(mensaje);
    }
}
