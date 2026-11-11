package com.abordo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.PuntoTransporteDetalleResponse;
import com.abordo.dto.PuntoTransporteRequest;
import com.abordo.dto.PuntoTransporteResponse;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.model.PuntoTransporte;
import com.abordo.model.Ruta;
import com.abordo.repository.PuntoTransporteRepository;
import com.abordo.repository.RutaRepository;

/** HU_013 Gestionar puntos de transporte y HU_014 Consultarlos. */
@Service
public class PuntoTransporteServicio {

    private final PuntoTransporteRepository puntoRepository;
    private final RutaRepository rutaRepository;

    public PuntoTransporteServicio(PuntoTransporteRepository puntoRepository, RutaRepository rutaRepository) {
        this.puntoRepository = puntoRepository;
        this.rutaRepository = rutaRepository;
    }

    public List<PuntoTransporteResponse> listar() {
        return puntoRepository.findAll().stream().map(PuntoTransporteResponse::desde).toList();
    }

    public PuntoTransporte buscar(String id) {
        return puntoRepository.findById(id)
                .orElseThrow(() -> new NoEncontradoException("No existe el punto de transporte " + id));
    }

    /** HU_014: el punto con las empresas que salen de él y los destinos que atiende. */
    public PuntoTransporteDetalleResponse detalle(String id) {
        PuntoTransporte punto = buscar(id);
        List<Ruta> rutas = rutaRepository.findByPuntoTransporte(punto);
        List<String> empresas = rutas.stream().map(r -> r.getEmpresa().getNombre()).distinct().sorted().toList();
        List<String> destinos = rutas.stream().map(Ruta::getDestino).distinct().sorted().toList();
        return new PuntoTransporteDetalleResponse(PuntoTransporteResponse.desde(punto), empresas, destinos);
    }

    /** HU_014: desde qué punto(s) sale un destino. */
    public List<PuntoTransporteResponse> puntosHacia(String destino) {
        return rutaRepository.findByDestinoContainingIgnoreCase(destino.trim()).stream()
                .map(Ruta::getPuntoTransporte)
                .filter(p -> p != null)
                .collect(java.util.stream.Collectors.toMap(PuntoTransporte::getId, p -> p, (a, b) -> a))
                .values().stream().map(PuntoTransporteResponse::desde).toList();
    }

    public PuntoTransporteResponse crear(PuntoTransporteRequest datos) {
        if (puntoRepository.existsByNombreIgnoreCase(datos.nombre().trim())) {
            throw new ConflictoException("Ya existe un punto de transporte llamado " + datos.nombre());
        }
        PuntoTransporte punto = new PuntoTransporte(datos.nombre().trim(), datos.direccion(),
                datos.horarioAtencion(), datos.zonaQueAtiende());
        return PuntoTransporteResponse.desde(puntoRepository.save(punto));
    }

    public PuntoTransporteResponse actualizar(String id, PuntoTransporteRequest datos) {
        PuntoTransporte punto = buscar(id);
        boolean cambiaNombre = !punto.getNombre().equalsIgnoreCase(datos.nombre().trim());
        if (cambiaNombre && puntoRepository.existsByNombreIgnoreCase(datos.nombre().trim())) {
            throw new ConflictoException("Ya existe un punto de transporte llamado " + datos.nombre());
        }
        punto.setNombre(datos.nombre().trim());
        punto.setDireccion(datos.direccion());
        punto.setHorarioAtencion(datos.horarioAtencion());
        punto.setZonaQueAtiende(datos.zonaQueAtiende());
        return PuntoTransporteResponse.desde(puntoRepository.save(punto));
    }

    public void eliminar(String id) {
        PuntoTransporte punto = buscar(id);
        if (rutaRepository.existsByPuntoTransporte(punto)) {
            throw new ConflictoException("No se puede eliminar: el punto tiene rutas registradas");
        }
        puntoRepository.delete(punto);
    }
}
