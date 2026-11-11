package com.abordo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "buses")
public class Bus {

    public static final int CAPACIDAD_MINIMA = 10;
    public static final int CAPACIDAD_MAXIMA = 45;

    @Id
    private String id;
    @Indexed(unique = true)
    private String placa;
    private int capacidad;
    private TipoServicio tipoServicio;
    @DBRef
    private EmpresaTransportadora empresa;

    public Bus() {
    }

    public Bus(String placa, int capacidad, TipoServicio tipoServicio, EmpresaTransportadora empresa) {
        this.placa = placa;
        this.capacidad = capacidad;
        this.tipoServicio = tipoServicio;
        this.empresa = empresa;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }
    public int getCapacidad() { return capacidad; }
    public void setCapacidad(int capacidad) { this.capacidad = capacidad; }
    public TipoServicio getTipoServicio() { return tipoServicio; }
    public void setTipoServicio(TipoServicio tipoServicio) { this.tipoServicio = tipoServicio; }
    public EmpresaTransportadora getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaTransportadora empresa) { this.empresa = empresa; }
}
