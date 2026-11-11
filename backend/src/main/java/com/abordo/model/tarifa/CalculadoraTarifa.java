package com.abordo.model.tarifa;

/**
 * Polimorfismo: cada tipo de pasajero calcula su precio a su manera.
 * RN1: precio final = precio base - descuento + tasa de uso de la terminal.
 */
public interface CalculadoraTarifa {

    /** RN3: tasa de uso de la terminal. Para cambiarla basta con editar este valor. */
    double TASA_USO_TERMINAL = 3000;

    double calcularPrecio(double precioBase);
}
