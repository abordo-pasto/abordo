package com.abordo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.Bus;
import com.abordo.model.Ruta;
import com.abordo.model.Salida;

public interface SalidaRepository extends MongoRepository<Salida, String> {

    List<Salida> findByRutaInAndFechaHoraBetweenOrderByFechaHora(List<Ruta> rutas, LocalDateTime desde, LocalDateTime hasta);

    List<Salida> findByRutaInOrderByFechaHoraDesc(List<Ruta> rutas);

    boolean existsByBusAndFechaHoraAndCanceladaFalse(Bus bus, LocalDateTime fechaHora);

    boolean existsByBus(Bus bus);

    boolean existsByRuta(Ruta ruta);
}
