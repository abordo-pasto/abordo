package com.abordo.model;

import java.util.Comparator;
import java.util.List;

import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.tarifa.FabricaTarifas;

/** Compara de 2 a 4 salidas al mismo destino (HU_015). No se guarda en la base de datos. */
public class ComparacionSalidas {

    public static final int MINIMO = 2;
    public static final int MAXIMO = 4;

    private final String destino;
    private final List<Salida> salidas;

    public ComparacionSalidas(List<Salida> salidas) {
        if (salidas.size() < MINIMO || salidas.size() > MAXIMO) {
            throw new ReglaNegocioException("Se pueden comparar de " + MINIMO + " a " + MAXIMO + " salidas");
        }
        String primerDestino = salidas.get(0).getRuta().getDestino();
        boolean mismoDestino = salidas.stream()
                .allMatch(s -> s.getRuta().getDestino().equalsIgnoreCase(primerDestino));
        if (!mismoDestino) {
            throw new ReglaNegocioException("Todas las salidas deben ir al mismo destino");
        }
        this.destino = primerDestino;
        this.salidas = salidas;
    }

    public double precioFinal(Salida salida, TipoPasajero tipo) {
        return FabricaTarifas.para(tipo).calcularPrecio(salida.getPrecioBase());
    }

    public Salida masBarata(TipoPasajero tipo) {
        return salidas.stream()
                .min(Comparator.comparingDouble(s -> precioFinal(s, tipo)))
                .orElseThrow();
    }

    public Salida masRapida() {
        return salidas.stream()
                .min(Comparator.comparingInt(s -> s.getRuta().getDuracionMinutos()))
                .orElseThrow();
    }

    public String getDestino() { return destino; }
    public List<Salida> getSalidas() { return salidas; }
}
