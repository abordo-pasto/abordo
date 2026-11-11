package com.abordo.model.tarifa;

/** RN2: descuento para pasajero GENERAL. */
public class TarifaGeneral implements CalculadoraTarifa {

    public static final double DESCUENTO = 0.0;

    @Override
    public double calcularPrecio(double precioBase) {
        return precioBase - precioBase * DESCUENTO + TASA_USO_TERMINAL;
    }
}
