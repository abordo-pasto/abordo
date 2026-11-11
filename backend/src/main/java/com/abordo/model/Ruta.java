package com.abordo.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/** Trayecto que una empresa cubre desde un punto de transporte de Pasto hasta un destino (RN7). */
@Document(collection = "rutas")
public class Ruta {

    @Id
    private String id;
    private String destino;
    private int duracionMinutos;
    @DBRef
    private PuntoTransporte puntoTransporte;
    @DBRef
    private EmpresaTransportadora empresa;

    public Ruta() {
    }

    public Ruta(String destino, int duracionMinutos, PuntoTransporte puntoTransporte, EmpresaTransportadora empresa) {
        this.destino = destino;
        this.duracionMinutos = duracionMinutos;
        this.puntoTransporte = puntoTransporte;
        this.empresa = empresa;
    }

    /** Experto (RN8): la ruta conoce su duración, así que calcula la hora de llegada. */
    public LocalDateTime calcularLlegada(LocalDateTime horaSalida) {
        return horaSalida.plusMinutes(duracionMinutos);
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public int getDuracionMinutos() { return duracionMinutos; }
    public void setDuracionMinutos(int duracionMinutos) { this.duracionMinutos = duracionMinutos; }
    public PuntoTransporte getPuntoTransporte() { return puntoTransporte; }
    public void setPuntoTransporte(PuntoTransporte puntoTransporte) { this.puntoTransporte = puntoTransporte; }
    public EmpresaTransportadora getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaTransportadora empresa) { this.empresa = empresa; }
}
