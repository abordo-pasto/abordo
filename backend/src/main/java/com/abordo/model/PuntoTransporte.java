package com.abordo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/** Uno de los puntos de transporte terrestre de Pasto (Terminal de Transportes, Terminal Mixto, Torobajo). */
@Document(collection = "puntos_transporte")
public class PuntoTransporte {

    @Id
    private String id;
    @Indexed(unique = true)
    private String nombre;
    private String direccion;
    private String horarioAtencion;
    private String zonaQueAtiende;

    public PuntoTransporte() {
    }

    public PuntoTransporte(String nombre, String direccion, String horarioAtencion, String zonaQueAtiende) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.horarioAtencion = horarioAtencion;
        this.zonaQueAtiende = zonaQueAtiende;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getHorarioAtencion() { return horarioAtencion; }
    public void setHorarioAtencion(String horarioAtencion) { this.horarioAtencion = horarioAtencion; }
    public String getZonaQueAtiende() { return zonaQueAtiende; }
    public void setZonaQueAtiende(String zonaQueAtiende) { this.zonaQueAtiende = zonaQueAtiende; }
}
