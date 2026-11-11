package com.abordo.integracion;

/**
 * Indirección / Variaciones protegidas (RNF_012): la venta depende de esta interfaz y no de una
 * pasarela concreta. Para usar una pasarela real basta con crear otra implementación.
 */
public interface PasarelaPagos {

    ResultadoPago autorizar(String referencia, double monto, String numeroTarjeta);
}
