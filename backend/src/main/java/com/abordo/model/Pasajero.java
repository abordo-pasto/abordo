package com.abordo.model;

import org.springframework.data.annotation.TypeAlias;

@TypeAlias("pasajero")
public class Pasajero extends Usuario {

    private String documento;

    public Pasajero() {
    }

    public Pasajero(String nombre, String correo, String contrasenaCifrada, String documento) {
        super(nombre, correo, contrasenaCifrada, Rol.PASAJERO);
        this.documento = documento;
    }

    public String getDocumento() { return documento; }
    public void setDocumento(String documento) { this.documento = documento; }
}
