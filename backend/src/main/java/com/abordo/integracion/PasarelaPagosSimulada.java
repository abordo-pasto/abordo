package com.abordo.integracion;

import java.util.UUID;

import org.springframework.stereotype.Component;

/**
 * Pasarela de pagos simulada. Aprueba cualquier tarjeta de 16 dígitos,
 * excepto las que terminan en 0000 (se rechazan por fondos insuficientes).
 */
@Component
public class PasarelaPagosSimulada implements PasarelaPagos {

    @Override
    public ResultadoPago autorizar(String referencia, double monto, String numeroTarjeta) {
        if (numeroTarjeta == null || !numeroTarjeta.matches("\\d{16}")) {
            return new ResultadoPago(false, null, "Número de tarjeta inválido");
        }
        if (numeroTarjeta.endsWith("0000")) {
            return new ResultadoPago(false, null, "Pago rechazado por fondos insuficientes");
        }
        String codigo = "AUT-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return new ResultadoPago(true, codigo, "Pago aprobado");
    }
}
