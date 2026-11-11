package com.abordo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.ReporteVentasResponse;
import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.OperadorEmpresa;
import com.abordo.model.ReporteVentas;
import com.abordo.model.Tiquete;
import com.abordo.model.Usuario;
import com.abordo.repository.TiqueteRepository;
import com.abordo.security.UsuarioActual;

/** HU_007 Reporte de ventas: el operador ve solo su empresa y el administrador todas (RN9). */
@Service
public class ReporteServicio {

    private final TiqueteRepository tiqueteRepository;
    private final UsuarioActual usuarioActual;

    public ReporteServicio(TiqueteRepository tiqueteRepository, UsuarioActual usuarioActual) {
        this.tiqueteRepository = tiqueteRepository;
        this.usuarioActual = usuarioActual;
    }

    public ReporteVentasResponse ventas(LocalDate desde, LocalDate hasta) {
        if (hasta.isBefore(desde)) {
            throw new ReglaNegocioException("La fecha final no puede ser anterior a la inicial");
        }
        List<Tiquete> tiquetes = tiqueteRepository.findByFechaCompraBetween(desde.atStartOfDay(), hasta.plusDays(1).atStartOfDay());

        Usuario usuario = usuarioActual.obtener();
        if (usuario instanceof OperadorEmpresa operador) {
            tiquetes = tiquetes.stream()
                    .filter(t -> operador.perteneceA(t.getSalida().getRuta().getEmpresa()))
                    .toList();
        }
        return ReporteVentasResponse.desde(new ReporteVentas(desde, hasta, tiquetes));
    }
}
