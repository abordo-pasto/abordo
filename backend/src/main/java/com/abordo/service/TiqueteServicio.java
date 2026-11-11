package com.abordo.service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.abordo.dto.CompraRequest;
import com.abordo.dto.TiqueteResponse;
import com.abordo.exception.AccesoDenegadoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.exception.PagoRechazadoException;
import com.abordo.integracion.PasarelaPagos;
import com.abordo.integracion.ResultadoPago;
import com.abordo.model.EstadoTiquete;
import com.abordo.model.Pasajero;
import com.abordo.model.Salida;
import com.abordo.model.Tiquete;
import com.abordo.model.tarifa.CalculadoraTarifa;
import com.abordo.model.tarifa.FabricaTarifas;
import com.abordo.repository.SalidaRepository;
import com.abordo.repository.TiqueteRepository;
import com.abordo.security.UsuarioActual;

/** HU_010 Comprar, HU_011 Consultar mis tiquetes y HU_012 Cancelar. */
@Service
public class TiqueteServicio {

    private final TiqueteRepository tiqueteRepository;
    private final SalidaRepository salidaRepository;
    private final SalidaServicio salidaServicio;
    private final PasarelaPagos pasarelaPagos;
    private final UsuarioActual usuarioActual;
    private final Clock reloj;

    public TiqueteServicio(TiqueteRepository tiqueteRepository, SalidaRepository salidaRepository,
                           SalidaServicio salidaServicio, PasarelaPagos pasarelaPagos,
                           UsuarioActual usuarioActual, Clock reloj) {
        this.tiqueteRepository = tiqueteRepository;
        this.salidaRepository = salidaRepository;
        this.salidaServicio = salidaServicio;
        this.pasarelaPagos = pasarelaPagos;
        this.usuarioActual = usuarioActual;
        this.reloj = reloj;
    }

    public TiqueteResponse comprar(CompraRequest datos) {
        LocalDateTime ahora = LocalDateTime.now(reloj);
        Pasajero pasajero = usuarioActual.pasajero();
        Salida salida = salidaServicio.buscar(datos.salidaId());

        // La salida valida el asiento y crea el tiquete con el precio de la calculadora (Creador + Polimorfismo)
        CalculadoraTarifa calculadora = FabricaTarifas.para(datos.tipoPasajero());
        Tiquete tiquete = salida.emitirTiquete(pasajero, datos.numeroAsiento(), datos.tipoPasajero(), calculadora, ahora);

        // RN10: el tiquete solo se emite si la pasarela aprueba el pago
        ResultadoPago pago = pasarelaPagos.autorizar(tiquete.getCodigo(), tiquete.getPrecioFinal(), datos.numeroTarjeta());
        if (!pago.aprobado()) {
            throw new PagoRechazadoException(pago.mensaje());
        }

        salidaRepository.save(salida);
        return TiqueteResponse.desde(tiqueteRepository.save(tiquete), ahora);
    }

    public List<TiqueteResponse> misTiquetes(EstadoTiquete estado) {
        LocalDateTime ahora = LocalDateTime.now(reloj);
        Pasajero pasajero = usuarioActual.pasajero();
        List<Tiquete> tiquetes = estado == null
                ? tiqueteRepository.findByPasajeroOrderByFechaCompraDesc(pasajero)
                : tiqueteRepository.findByPasajeroAndEstadoOrderByFechaCompraDesc(pasajero, estado);
        return tiquetes.stream().map(t -> TiqueteResponse.desde(t, ahora)).toList();
    }

    public TiqueteResponse cancelar(String id) {
        LocalDateTime ahora = LocalDateTime.now(reloj);
        Pasajero pasajero = usuarioActual.pasajero();
        Tiquete tiquete = tiqueteRepository.findById(id)
                .orElseThrow(() -> new NoEncontradoException("No existe el tiquete " + id));
        if (!tiquete.getPasajero().getId().equals(pasajero.getId())) {
            throw new AccesoDenegadoException("El tiquete no es suyo");
        }
        tiquete.cancelar(ahora);
        salidaRepository.save(tiquete.getSalida());
        return TiqueteResponse.desde(tiqueteRepository.save(tiquete), ahora);
    }
}
