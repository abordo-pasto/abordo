package com.abordo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.Bus;
import com.abordo.model.EmpresaTransportadora;

public interface BusRepository extends MongoRepository<Bus, String> {

    List<Bus> findByEmpresa(EmpresaTransportadora empresa);

    boolean existsByEmpresa(EmpresaTransportadora empresa);

    boolean existsByPlacaIgnoreCase(String placa);
}
