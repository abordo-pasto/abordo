package com.abordo.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.abordo.exception.ReglaNegocioException;

@Document(collection = "tiquetes")
public class Tiquete {

    /** RN5: horas mínimas de anticipación para cancelar. */
    public static final int HORAS_MINIMAS_CANCELACION = 2;

    @Id
    private String id;
    @Indexed(unique = true)
    private String codigo;
    private int numeroAsiento;
    private TipoPasajero tipoPasajero;
    private double precioFinal;
    private LocalDateTime fechaCompra;
    private EstadoTiquete estado;
    @DBRef
    private Salida salida;
    @DBRef
    private Pasajero pasajero;

    public Tiquete() {
    }

    Tiquete(Salida salida, Pasajero pasajero, int numeroAsiento, TipoPasajero tipoPasajero,
            double precioFinal, LocalDateTime fechaCompra) {
        this.codigo = "ABD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        this.salida = salida;
        this.pasajero = pasajero;
        this.numeroAsiento = numeroAsiento;
        this.tipoPasajero = tipoPasajero;
        this.precioFinal = precioFinal;
        this.fechaCompra = fechaCompra;
        this.estado = EstadoTiquete.ACTIVO;
    }

    /** RN5: solo se cancela un tiquete activo si faltan más de 2 horas para la salida. */
    public boolean puedeCancelarse(LocalDateTime ahora) {
        return estado == EstadoTiquete.ACTIVO
                && ahora.plusHours(HORAS_MINIMAS_CANCELACION).isBefore(salida.getFechaHora());
    }

    public void cancelar(LocalDateTime ahora) {
        if (estado != EstadoTiquete.ACTIVO) {
            throw new ReglaNegocioException("Solo se pueden cancelar tiquetes activos");
        }
        if (!puedeCancelarse(ahora)) {
            throw new ReglaNegocioException("Solo se puede cancelar con más de "
                    + HORAS_MINIMAS_CANCELACION + " horas de anticipación");
        }
        estado = EstadoTiquete.CANCELADO;
        salida.liberarAsiento(numeroAsiento);
    }

    public void marcarUsado() {
        estado = EstadoTiquete.USADO;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public int getNumeroAsiento() { return numeroAsiento; }
    public void setNumeroAsiento(int numeroAsiento) { this.numeroAsiento = numeroAsiento; }
    public TipoPasajero getTipoPasajero() { return tipoPasajero; }
    public void setTipoPasajero(TipoPasajero tipoPasajero) { this.tipoPasajero = tipoPasajero; }
    public double getPrecioFinal() { return precioFinal; }
    public void setPrecioFinal(double precioFinal) { this.precioFinal = precioFinal; }
    public LocalDateTime getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(LocalDateTime fechaCompra) { this.fechaCompra = fechaCompra; }
    public EstadoTiquete getEstado() { return estado; }
    public void setEstado(EstadoTiquete estado) { this.estado = estado; }
    public Salida getSalida() { return salida; }
    public void setSalida(Salida salida) { this.salida = salida; }
    public Pasajero getPasajero() { return pasajero; }
    public void setPasajero(Pasajero pasajero) { this.pasajero = pasajero; }
}
