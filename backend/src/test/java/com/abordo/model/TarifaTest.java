package com.abordo.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.abordo.model.tarifa.FabricaTarifas;

/** RN1 y RN2 con el ejemplo de las historias: precio base $50.000. */
class TarifaTest {

    @Test
    void generalPagaBaseMasTasa() {
        assertEquals(53000, FabricaTarifas.para(TipoPasajero.GENERAL).calcularPrecio(50000));
    }

    @Test
    void estudianteTieneDiezPorCiento() {
        assertEquals(48000, FabricaTarifas.para(TipoPasajero.ESTUDIANTE).calcularPrecio(50000));
    }

    @Test
    void adultoMayorTieneVeintePorCiento() {
        assertEquals(43000, FabricaTarifas.para(TipoPasajero.ADULTO_MAYOR).calcularPrecio(50000));
    }
}
