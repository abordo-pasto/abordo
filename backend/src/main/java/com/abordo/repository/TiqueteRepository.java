package com.abordo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.EstadoTiquete;
import com.abordo.model.Pasajero;
import com.abordo.model.Tiquete;

public interface TiqueteRepository extends MongoRepository<Tiquete, String> {

    List<Tiquete> findByPasajeroOrderByFechaCompraDesc(Pasajero pasajero);

    List<Tiquete> findByPasajeroAndEstadoOrderByFechaCompraDesc(Pasajero pasajero, EstadoTiquete estado);

    List<Tiquete> findByFechaCompraBetween(LocalDateTime desde, LocalDateTime hasta);
}
