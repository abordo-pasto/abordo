package com.abordo.model.tarifa;

/** RN2: descuento para pasajero ESTUDIANTE. */
public class TarifaEstudiante implements CalculadoraTarifa {

    public static final double DESCUENTO = 0.10;

    @Override
    public double calcularPrecio(double precioBase) {
        return precioBase - precioBase * DESCUENTO + TASA_USO_TERMINAL;
    }
}
