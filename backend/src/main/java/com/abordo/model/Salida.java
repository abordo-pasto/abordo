package com.abordo.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.abordo.exception.ConflictoException;
import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.tarifa.CalculadoraTarifa;

/** Viaje programado de una ruta, en un bus, a una fecha y hora, con su precio base. */
@Document(collection = "salidas")
public class Salida {

    @Id
    private String id;
    private LocalDateTime fechaHora;
    private double precioBase;
    @DBRef
    private Ruta ruta;
    @DBRef
    private Bus bus;
    private Set<Integer> asientosOcupados = new TreeSet<>();
    private boolean cancelada;

    public Salida() {
    }

    public Salida(LocalDateTime fechaHora, double precioBase, Ruta ruta, Bus bus) {
        this.fechaHora = fechaHora;
        this.precioBase = precioBase;
        this.ruta = ruta;
        this.bus = bus;
    }

    /** RN8: hora de salida + duración de la ruta. */
    public LocalDateTime horaEstimadaLlegada() {
        return ruta.calcularLlegada(fechaHora);
    }

    /** Experto: la salida conoce su bus y sus asientos ocupados. */
    public int asientosLibres() {
        return bus.getCapacidad() - asientosOcupados.size();
    }

    public boolean estaOcupado(int numeroAsiento) {
        return asientosOcupados.contains(numeroAsiento);
    }

    public boolean esFutura(LocalDateTime ahora) {
        return !cancelada && fechaHora.isAfter(ahora);
    }

    /**
     * Creador: la salida crea el tiquete porque tiene los datos para hacerlo (asientos y precio base).
     * Polimorfismo: el precio lo calcula la CalculadoraTarifa que corresponda al tipo de pasajero.
     */
    public Tiquete emitirTiquete(Pasajero pasajero, int numeroAsiento, TipoPasajero tipoPasajero,
                                 CalculadoraTarifa calculadora, LocalDateTime ahora) {
        if (!esFutura(ahora)) {
            throw new ReglaNegocioException("La salida ya partió o fue cancelada");
        }
        if (numeroAsiento < 1 || numeroAsiento > bus.getCapacidad()) {
            throw new ReglaNegocioException("El asiento debe estar entre 1 y " + bus.getCapacidad());
        }
        if (estaOcupado(numeroAsiento)) {
            throw new ConflictoException("El asiento " + numeroAsiento + " ya está ocupado");
        }
        asientosOcupados.add(numeroAsiento);
        double precioFinal = calculadora.calcularPrecio(precioBase);
        return new Tiquete(this, pasajero, numeroAsiento, tipoPasajero, precioFinal, ahora);
    }

    public void liberarAsiento(int numeroAsiento) {
        asientosOcupados.remove(numeroAsiento);
    }

    public void cancelar() {
        this.cancelada = true;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
    public double getPrecioBase() { return precioBase; }
    public void setPrecioBase(double precioBase) { this.precioBase = precioBase; }
    public Ruta getRuta() { return ruta; }
    public void setRuta(Ruta ruta) { this.ruta = ruta; }
    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }
    public Set<Integer> getAsientosOcupados() { return asientosOcupados; }
    public void setAsientosOcupados(Set<Integer> asientosOcupados) { this.asientosOcupados = asientosOcupados; }
    public boolean isCancelada() { return cancelada; }
    public void setCancelada(boolean cancelada) { this.cancelada = cancelada; }
}
