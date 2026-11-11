package com.abordo.model;

/** Ventas de una empresa dentro del reporte. */
public class LineaReporte {

    private final String empresa;
    private int cantidadTiquetes;
    private double totalRecaudado;

    public LineaReporte(String empresa) {
        this.empresa = empresa;
    }

    public void agregar(Tiquete tiquete) {
        cantidadTiquetes++;
        totalRecaudado += tiquete.getPrecioFinal();
    }

    public String getEmpresa() { return empresa; }
    public int getCantidadTiquetes() { return cantidadTiquetes; }
    public double getTotalRecaudado() { return totalRecaudado; }
}
