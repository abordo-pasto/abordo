package com.abordo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.BusRequest;
import com.abordo.dto.BusResponse;
import com.abordo.exception.AccesoDenegadoException;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.model.Bus;
import com.abordo.model.OperadorEmpresa;
import com.abordo.repository.BusRepository;
import com.abordo.repository.SalidaRepository;
import com.abordo.security.UsuarioActual;

/** HU_004 Gestionar buses. El operador solo ve y cambia los buses de su empresa (RN9). */
@Service
public class BusServicio {

    private final BusRepository busRepository;
    private final SalidaRepository salidaRepository;
    private final UsuarioActual usuarioActual;

    public BusServicio(BusRepository busRepository, SalidaRepository salidaRepository, UsuarioActual usuarioActual) {
        this.busRepository = busRepository;
        this.salidaRepository = salidaRepository;
        this.usuarioActual = usuarioActual;
    }

    public List<BusResponse> listarMiEmpresa() {
        return busRepository.findByEmpresa(usuarioActual.operador().getEmpresa()).stream()
                .map(BusResponse::desde).toList();
    }

    /** Busca un bus y comprueba que sea de la empresa del operador. */
    public Bus buscarPropio(String id) {
        OperadorEmpresa operador = usuarioActual.operador();
        Bus bus = busRepository.findById(id).orElseThrow(() -> new NoEncontradoException("No existe el bus " + id));
        if (!operador.perteneceA(bus.getEmpresa())) {
            throw new AccesoDenegadoException("El bus no pertenece a su empresa");
        }
        return bus;
    }

    public BusResponse crear(BusRequest datos) {
        String placa = datos.placa().trim().toUpperCase();
        if (busRepository.existsByPlacaIgnoreCase(placa)) {
            throw new ConflictoException("Ya existe un bus con la placa " + placa);
        }
        Bus bus = new Bus(placa, datos.capacidad(), datos.tipoServicio(), usuarioActual.operador().getEmpresa());
        return BusResponse.desde(busRepository.save(bus));
    }

    public BusResponse actualizar(String id, BusRequest datos) {
        Bus bus = buscarPropio(id);
        String placa = datos.placa().trim().toUpperCase();
        if (!bus.getPlaca().equals(placa) && busRepository.existsByPlacaIgnoreCase(placa)) {
            throw new ConflictoException("Ya existe un bus con la placa " + placa);
        }
        bus.setPlaca(placa);
        bus.setCapacidad(datos.capacidad());
        bus.setTipoServicio(datos.tipoServicio());
        return BusResponse.desde(busRepository.save(bus));
    }

    public void eliminar(String id) {
        Bus bus = buscarPropio(id);
        if (salidaRepository.existsByBus(bus)) {
            throw new ConflictoException("No se puede eliminar: el bus tiene salidas programadas");
        }
        busRepository.delete(bus);
    }
}
