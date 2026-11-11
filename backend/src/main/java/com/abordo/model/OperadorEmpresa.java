package com.abordo.model;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;

/** Empleado de una empresa transportadora. Solo gestiona la información de su empresa (RN9). */
@TypeAlias("operador")
public class OperadorEmpresa extends Usuario {

    @DBRef
    private EmpresaTransportadora empresa;

    public OperadorEmpresa() {
    }

    public OperadorEmpresa(String nombre, String correo, String contrasenaCifrada, EmpresaTransportadora empresa) {
        super(nombre, correo, contrasenaCifrada, Rol.OPERADOR);
        this.empresa = empresa;
    }

    public void desactivar() { setActivo(false); }
    public void reactivar() { setActivo(true); }

    public boolean perteneceA(EmpresaTransportadora otra) {
        return empresa != null && otra != null && empresa.getId().equals(otra.getId());
    }

    public EmpresaTransportadora getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaTransportadora empresa) { this.empresa = empresa; }
}
