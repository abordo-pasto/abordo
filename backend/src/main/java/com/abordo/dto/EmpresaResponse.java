package com.abordo.dto;

import com.abordo.model.EmpresaTransportadora;

public record EmpresaResponse(String id, String nombre, String nit, String telefono) {

    public static EmpresaResponse desde(EmpresaTransportadora e) {
        return new EmpresaResponse(e.getId(), e.getNombre(), e.getNit(), e.getTelefono());
    }
}
