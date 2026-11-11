package com.abordo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.RutaRequest;
import com.abordo.dto.RutaResponse;
import com.abordo.exception.AccesoDenegadoException;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.OperadorEmpresa;
import com.abordo.model.PuntoTransporte;
import com.abordo.model.Ruta;
import com.abordo.repository.RutaRepository;
import com.abordo.repository.SalidaRepository;
import com.abordo.security.UsuarioActual;

/** HU_005 Gestionar rutas. */
@Service
public class RutaServicio {

    private final RutaRepository rutaRepository;
    private final SalidaRepository salidaRepository;
    private final PuntoTransporteServicio puntoServicio;
    private final UsuarioActual usuarioActual;

    public RutaServicio(RutaRepository rutaRepository, SalidaRepository salidaRepository,
                        PuntoTransporteServicio puntoServicio, UsuarioActual usuarioActual) {
        this.rutaRepository = rutaRepository;
        this.salidaRepository = salidaRepository;
        this.puntoServicio = puntoServicio;
        this.usuarioActual = usuarioActual;
    }

    public List<RutaResponse> listarMiEmpresa() {
        return rutaRepository.findByEmpresa(usuarioActual.operador().getEmpresa()).stream()
                .map(RutaResponse::desde).toList();
    }

    /** Lista de destinos para que la app los sugiera al buscar. */
    public List<String> destinos() {
        return rutaRepository.findAll().stream().map(Ruta::getDestino).distinct().sorted().toList();
    }

    public Ruta buscarPropia(String id) {
        OperadorEmpresa operador = usuarioActual.operador();
        Ruta ruta = rutaRepository.findById(id).orElseThrow(() -> new NoEncontradoException("No existe la ruta " + id));
        if (!operador.perteneceA(ruta.getEmpresa())) {
            throw new AccesoDenegadoException("La ruta no pertenece a su empresa");
        }
        return ruta;
    }

    public RutaResponse crear(RutaRequest datos) {
        validarDestino(datos.destino());
        PuntoTransporte punto = puntoServicio.buscar(datos.puntoTransporteId());
        Ruta ruta = new Ruta(datos.destino().trim(), datos.duracionMinutos(), punto, usuarioActual.operador().getEmpresa());
        return RutaResponse.desde(rutaRepository.save(ruta));
    }

    public RutaResponse actualizar(String id, RutaRequest datos) {
        validarDestino(datos.destino());
        Ruta ruta = buscarPropia(id);
        ruta.setDestino(datos.destino().trim());
        ruta.setDuracionMinutos(datos.duracionMinutos());
        ruta.setPuntoTransporte(puntoServicio.buscar(datos.puntoTransporteId()));
        return RutaResponse.desde(rutaRepository.save(ruta));
    }

    public void eliminar(String id) {
        Ruta ruta = buscarPropia(id);
        if (salidaRepository.existsByRuta(ruta)) {
            throw new ConflictoException("No se puede eliminar: la ruta tiene salidas programadas");
        }
        rutaRepository.delete(ruta);
    }

    private void validarDestino(String destino) {
        if (destino.trim().equalsIgnoreCase("Pasto")) {
            throw new ReglaNegocioException("El destino debe ser distinto de Pasto");
        }
    }
}
