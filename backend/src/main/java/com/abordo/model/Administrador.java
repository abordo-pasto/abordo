package com.abordo.model;

import org.springframework.data.annotation.TypeAlias;

@TypeAlias("administrador")
public class Administrador extends Usuario {

    public Administrador() {
    }

    public Administrador(String nombre, String correo, String contrasenaCifrada) {
        super(nombre, correo, contrasenaCifrada, Rol.ADMINISTRADOR);
    }
}
