package com.abordo.model.tarifa;

import com.abordo.model.TipoPasajero;

/** Fabricación pura: decide qué calculadora usar según el tipo de pasajero. */
public final class FabricaTarifas {

    private FabricaTarifas() {
    }

    public static CalculadoraTarifa para(TipoPasajero tipo) {
        return switch (tipo) {
            case GENERAL -> new TarifaGeneral();
            case ESTUDIANTE -> new TarifaEstudiante();
            case ADULTO_MAYOR -> new TarifaAdultoMayor();
        };
    }
}
