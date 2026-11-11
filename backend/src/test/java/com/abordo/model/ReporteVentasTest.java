package com.abordo.model;

import static com.abordo.model.Datos.AHORA;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.abordo.model.tarifa.TarifaGeneral;

class ReporteVentasTest {

    @Test
    void sumaPorEmpresaSinContarLosCancelados() {
        Pasajero pasajero = new Pasajero("Ana", "ana@correo.com", "x", "1");
        Salida salida = Datos.salida("1", "Ipiales", 120, 20000, AHORA.plusDays(1), 40);
        Tiquete t1 = salida.emitirTiquete(pasajero, 1, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);
        Tiquete t2 = salida.emitirTiquete(pasajero, 2, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);
        Tiquete cancelado = salida.emitirTiquete(pasajero, 3, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);
        cancelado.cancelar(AHORA);

        ReporteVentas reporte = new ReporteVentas(AHORA.toLocalDate(), AHORA.toLocalDate(), List.of(t1, t2, cancelado));

        assertEquals(1, reporte.getLineas().size());
        assertEquals(2, reporte.totalTiquetes());
        assertEquals(46000, reporte.totalRecaudado());
    }
}
