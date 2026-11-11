package com.abordo.model;

import static com.abordo.model.Datos.AHORA;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.abordo.exception.ReglaNegocioException;

class ComparacionSalidasTest {

    private final Salida barata = Datos.salida("a", "Ipiales", 150, 20000, AHORA.plusHours(5), 40);
    private final Salida rapida = Datos.salida("b", "Ipiales", 100, 30000, AHORA.plusHours(5), 40);

    @Test
    void marcaLaMasBarataYLaMasRapida() {
        ComparacionSalidas comparacion = new ComparacionSalidas(List.of(barata, rapida));

        assertSame(barata, comparacion.masBarata(TipoPasajero.GENERAL));
        assertSame(rapida, comparacion.masRapida());
        assertEquals(21000, comparacion.precioFinal(barata, TipoPasajero.ESTUDIANTE));
    }

    @Test
    void necesitaDeDosACuatroSalidas() {
        assertThrows(ReglaNegocioException.class, () -> new ComparacionSalidas(List.of(barata)));
    }

    @Test
    void todasDebenIrAlMismoDestino() {
        Salida otra = Datos.salida("c", "Cali", 500, 70000, AHORA.plusHours(5), 40);
        assertThrows(ReglaNegocioException.class, () -> new ComparacionSalidas(List.of(barata, otra)));
    }
}
