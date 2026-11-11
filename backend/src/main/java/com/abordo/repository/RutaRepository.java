package com.abordo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.EmpresaTransportadora;
import com.abordo.model.PuntoTransporte;
import com.abordo.model.Ruta;

public interface RutaRepository extends MongoRepository<Ruta, String> {

    List<Ruta> findByEmpresa(EmpresaTransportadora empresa);

    List<Ruta> findByPuntoTransporte(PuntoTransporte puntoTransporte);

    List<Ruta> findByDestinoContainingIgnoreCase(String destino);

    boolean existsByEmpresa(EmpresaTransportadora empresa);

    boolean existsByPuntoTransporte(PuntoTransporte puntoTransporte);
}
