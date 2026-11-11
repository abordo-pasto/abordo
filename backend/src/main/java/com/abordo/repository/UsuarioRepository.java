package com.abordo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abordo.model.Rol;
import com.abordo.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Optional<Usuario> findByCorreoIgnoreCase(String correo);

    boolean existsByCorreoIgnoreCase(String correo);

    List<Usuario> findByRol(Rol rol);
}
