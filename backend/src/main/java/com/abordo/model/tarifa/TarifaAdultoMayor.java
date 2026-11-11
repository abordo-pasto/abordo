package com.abordo.model.tarifa;

/** RN2: descuento para pasajero ADULTO_MAYOR. */
public class TarifaAdultoMayor implements CalculadoraTarifa {

    public static final double DESCUENTO = 0.20;

    @Override
    public double calcularPrecio(double precioBase) {
        return precioBase - precioBase * DESCUENTO + TASA_USO_TERMINAL;
    }
}
