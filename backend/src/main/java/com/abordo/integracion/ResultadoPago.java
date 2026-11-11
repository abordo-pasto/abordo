package com.abordo.integracion;

public record ResultadoPago(boolean aprobado, String codigoAutorizacion, String mensaje) {
}
