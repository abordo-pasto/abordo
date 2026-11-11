package com.abordo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.EmpresaTransportadora;

public interface EmpresaRepository extends MongoRepository<EmpresaTransportadora, String> {

    boolean existsByNit(String nit);
}
