package com.abordo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "empresas")
public class EmpresaTransportadora {

    @Id
    private String id;
    private String nombre;
    @Indexed(unique = true)
    private String nit;
    private String telefono;

    public EmpresaTransportadora() {
    }

    public EmpresaTransportadora(String nombre, String nit, String telefono) {
        this.nombre = nombre;
        this.nit = nit;
        this.telefono = telefono;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getNit() { return nit; }
    public void setNit(String nit) { this.nit = nit; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
