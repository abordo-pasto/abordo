package com.abordo.dto;

import com.abordo.model.Bus;
import com.abordo.model.TipoServicio;

public record BusResponse(String id, String placa, int capacidad, TipoServicio tipoServicio, String empresa) {

    public static BusResponse desde(Bus b) {
        return new BusResponse(b.getId(), b.getPlaca(), b.getCapacidad(), b.getTipoServicio(), b.getEmpresa().getNombre());
    }
}
