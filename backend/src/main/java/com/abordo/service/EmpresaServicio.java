package com.abordo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.EmpresaRequest;
import com.abordo.dto.EmpresaResponse;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.model.EmpresaTransportadora;
import com.abordo.repository.BusRepository;
import com.abordo.repository.EmpresaRepository;
import com.abordo.repository.RutaRepository;

/** HU_003 Gestionar empresas transportadoras. */
@Service
public class EmpresaServicio {

    private final EmpresaRepository empresaRepository;
    private final BusRepository busRepository;
    private final RutaRepository rutaRepository;

    public EmpresaServicio(EmpresaRepository empresaRepository, BusRepository busRepository, RutaRepository rutaRepository) {
        this.empresaRepository = empresaRepository;
        this.busRepository = busRepository;
        this.rutaRepository = rutaRepository;
    }

    public List<EmpresaResponse> listar() {
        return empresaRepository.findAll().stream().map(EmpresaResponse::desde).toList();
    }

    public EmpresaTransportadora buscar(String id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new NoEncontradoException("No existe la empresa " + id));
    }

    public EmpresaResponse crear(EmpresaRequest datos) {
        if (empresaRepository.existsByNit(datos.nit())) {
            throw new ConflictoException("Ya existe una empresa con el NIT " + datos.nit());
        }
        EmpresaTransportadora empresa = new EmpresaTransportadora(datos.nombre().trim(), datos.nit(), datos.telefono());
        return EmpresaResponse.desde(empresaRepository.save(empresa));
    }

    public EmpresaResponse actualizar(String id, EmpresaRequest datos) {
        EmpresaTransportadora empresa = buscar(id);
        if (!empresa.getNit().equals(datos.nit()) && empresaRepository.existsByNit(datos.nit())) {
            throw new ConflictoException("Ya existe una empresa con el NIT " + datos.nit());
        }
        empresa.setNombre(datos.nombre().trim());
        empresa.setNit(datos.nit());
        empresa.setTelefono(datos.telefono());
        return EmpresaResponse.desde(empresaRepository.save(empresa));
    }

    public void eliminar(String id) {
        EmpresaTransportadora empresa = buscar(id);
        if (busRepository.existsByEmpresa(empresa) || rutaRepository.existsByEmpresa(empresa)) {
            throw new ConflictoException("No se puede eliminar: la empresa tiene buses o rutas registradas");
        }
        empresaRepository.delete(empresa);
    }
}
