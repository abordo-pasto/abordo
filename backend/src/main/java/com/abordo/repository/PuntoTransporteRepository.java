package com.abordo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.PuntoTransporte;

public interface PuntoTransporteRepository extends MongoRepository<PuntoTransporte, String> {

    boolean existsByNombreIgnoreCase(String nombre);
}
