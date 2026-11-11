package com.abordo.model;

import static com.abordo.model.Datos.AHORA;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.abordo.exception.ConflictoException;
import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.tarifa.TarifaEstudiante;

class SalidaTest {

    private final Pasajero pasajero = new Pasajero("Ana", "ana@correo.com", "x", "1");

    @Test
    void calculaHoraDeLlegadaConLaDuracionDeLaRuta() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 25000, AHORA.plusHours(4), 40);
        assertEquals(AHORA.plusHours(6), salida.horaEstimadaLlegada());
    }

    @Test
    void emitirTiqueteOcupaElAsientoYCalculaElPrecio() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 50000, AHORA.plusHours(4), 40);

        Tiquete tiquete = salida.emitirTiquete(pasajero, 7, TipoPasajero.ESTUDIANTE, new TarifaEstudiante(), AHORA);

        assertTrue(salida.estaOcupado(7));
        assertEquals(39, salida.asientosLibres());
        assertEquals(48000, tiquete.getPrecioFinal());
        assertEquals(EstadoTiquete.ACTIVO, tiquete.getEstado());
        assertTrue(tiquete.getCodigo().startsWith("ABD-"));
    }

    @Test
    void noVendeElMismoAsientoDosVeces() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 50000, AHORA.plusHours(4), 40);
        salida.emitirTiquete(pasajero, 7, TipoPasajero.GENERAL, new TarifaEstudiante(), AHORA);

        assertThrows(ConflictoException.class,
                () -> salida.emitirTiquete(pasajero, 7, TipoPasajero.GENERAL, new TarifaEstudiante(), AHORA));
    }

    @Test
    void noVendeAsientosQueNoExisten() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 50000, AHORA.plusHours(4), 20);
        assertThrows(ReglaNegocioException.class,
                () -> salida.emitirTiquete(pasajero, 21, TipoPasajero.GENERAL, new TarifaEstudiante(), AHORA));
    }

    @Test
    void noVendeSalidasQueYaPartieron() {
        Salida salida = Datos.salida("1", "Ipiales", 120, 50000, AHORA.minusHours(1), 20);
        assertThrows(ReglaNegocioException.class,
                () -> salida.emitirTiquete(pasajero, 1, TipoPasajero.GENERAL, new TarifaEstudiante(), AHORA));
    }
}
