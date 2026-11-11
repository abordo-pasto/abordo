package com.abordo.model;

import static com.abordo.model.Datos.AHORA;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.tarifa.TarifaGeneral;

/** RN5: solo se cancela con más de 2 horas de anticipación. */
class TiqueteTest {

    private final Pasajero pasajero = new Pasajero("Ana", "ana@correo.com", "x", "1");

    @Test
    void cancelarLiberaElAsiento() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 25000, AHORA.plusHours(3), 40);
        Tiquete tiquete = salida.emitirTiquete(pasajero, 5, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);

        tiquete.cancelar(AHORA);

        assertEquals(EstadoTiquete.CANCELADO, tiquete.getEstado());
        assertFalse(salida.estaOcupado(5));
    }

    @Test
    void noSeCancelaConMenosDeDosHoras() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 25000, AHORA.plusMinutes(90), 40);
        Tiquete tiquete = salida.emitirTiquete(pasajero, 5, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);

        assertFalse(tiquete.puedeCancelarse(AHORA));
        assertThrows(ReglaNegocioException.class, () -> tiquete.cancelar(AHORA));
    }

    @Test
    void noSeCancelaDosVeces() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 25000, AHORA.plusDays(1), 40);
        Tiquete tiquete = salida.emitirTiquete(pasajero, 5, TipoPasajero.GENERAL, new TarifaGeneral(), AHORA);
        tiquete.cancelar(AHORA);

        assertThrows(ReglaNegocioException.class, () -> tiquete.cancelar(AHORA));
    }
}
