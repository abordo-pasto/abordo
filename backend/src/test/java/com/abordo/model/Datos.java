package com.abordo.model;

import java.time.LocalDateTime;

/** Objetos de prueba reutilizables. */
final class Datos {

    static final LocalDateTime AHORA = LocalDateTime.of(2026, 11, 18, 8, 0);

    private Datos() {
    }

    static EmpresaTransportadora empresa(String id, String nombre) {
        EmpresaTransportadora e = new EmpresaTransportadora(nombre, "800-" + id, "123");
        e.setId(id);
        return e;
    }

    static Salida salida(String id, String destino, int duracion, double precio, LocalDateTime fechaHora, int capacidad) {
        EmpresaTransportadora empresa = empresa("e-" + id, "Empresa " + id);
        PuntoTransporte punto = new PuntoTransporte("Terminal", "Calle", "Siempre", "Todo");
        Ruta ruta = new Ruta(destino, duracion, punto, empresa);
        Bus bus = new Bus("ABC" + id, capacidad, TipoServicio.BASICO, empresa);
        Salida salida = new Salida(fechaHora, precio, ruta, bus);
        salida.setId(id);
        return salida;
    }
}
