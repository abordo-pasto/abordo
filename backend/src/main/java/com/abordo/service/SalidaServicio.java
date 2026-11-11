package com.abordo.service;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.abordo.dto.AsientosResponse;
import com.abordo.dto.ComparacionResponse;
import com.abordo.dto.SalidaRequest;
import com.abordo.dto.SalidaResponse;
import com.abordo.exception.AccesoDenegadoException;
import com.abordo.exception.ConflictoException;
import com.abordo.exception.NoEncontradoException;
import com.abordo.exception.ReglaNegocioException;
import com.abordo.model.Bus;
import com.abordo.model.ComparacionSalidas;
import com.abordo.model.OperadorEmpresa;
import com.abordo.model.Ruta;
import com.abordo.model.Salida;
import com.abordo.model.TipoPasajero;
import com.abordo.repository.RutaRepository;
import com.abordo.repository.SalidaRepository;
import com.abordo.security.UsuarioActual;

/** HU_006 Programar salidas, HU_008 Buscar, HU_009 Ver asientos y HU_015 Comparar. */
@Service
public class SalidaServicio {

    /** Si no se da fecha, la búsqueda muestra las salidas de los próximos días. */
    private static final int DIAS_BUSQUEDA_POR_DEFECTO = 30;

    private final SalidaRepository salidaRepository;
    private final RutaRepository rutaRepository;
    private final RutaServicio rutaServicio;
    private final BusServicio busServicio;
    private final UsuarioActual usuarioActual;
    private final Clock reloj;

    public SalidaServicio(SalidaRepository salidaRepository, RutaRepository rutaRepository, RutaServicio rutaServicio,
                          BusServicio busServicio, UsuarioActual usuarioActual, Clock reloj) {
        this.salidaRepository = salidaRepository;
        this.rutaRepository = rutaRepository;
        this.rutaServicio = rutaServicio;
        this.busServicio = busServicio;
        this.usuarioActual = usuarioActual;
        this.reloj = reloj;
    }

    public Salida buscar(String id) {
        return salidaRepository.findById(id).orElseThrow(() -> new NoEncontradoException("No existe la salida " + id));
    }

    // ---------- Operador (HU_006) ----------

    public SalidaResponse programar(SalidaRequest datos) {
        Ruta ruta = rutaServicio.buscarPropia(datos.rutaId());
        Bus bus = busServicio.buscarPropio(datos.busId());
        if (!bus.getEmpresa().getId().equals(ruta.getEmpresa().getId())) {
            throw new ReglaNegocioException("El bus debe ser de la misma empresa de la ruta");
        }
        if (salidaRepository.existsByBusAndFechaHoraAndCanceladaFalse(bus, datos.fechaHora())) {
            throw new ConflictoException("El bus " + bus.getPlaca() + " ya tiene una salida a esa fecha y hora");
        }
        Salida salida = new Salida(datos.fechaHora(), datos.precioBase(), ruta, bus);
        return SalidaResponse.desde(salidaRepository.save(salida));
    }

    public List<SalidaResponse> listarMiEmpresa() {
        OperadorEmpresa operador = usuarioActual.operador();
        List<Ruta> rutas = rutaRepository.findByEmpresa(operador.getEmpresa());
        return salidaRepository.findByRutaInOrderByFechaHoraDesc(rutas).stream().map(SalidaResponse::desde).toList();
    }

    public SalidaResponse cancelar(String id) {
        Salida salida = buscar(id);
        if (!usuarioActual.operador().perteneceA(salida.getRuta().getEmpresa())) {
            throw new AccesoDenegadoException("La salida no pertenece a su empresa");
        }
        if (!salida.getAsientosOcupados().isEmpty()) {
            throw new ConflictoException("No se puede cancelar: la salida ya tiene tiquetes vendidos");
        }
        salida.cancelar();
        return SalidaResponse.desde(salidaRepository.save(salida));
    }

    // ---------- Visitante y pasajero ----------

    /** HU_008: salidas futuras hacia un destino, por fecha y punto, ordenadas por hora o precio. */
    public List<SalidaResponse> buscarSalidas(String destino, LocalDate fecha, String puntoId, String orden) {
        LocalDateTime ahora = LocalDateTime.now(reloj);
        List<Ruta> rutas = rutaRepository.findByDestinoContainingIgnoreCase(destino.trim()).stream()
                .filter(r -> puntoId == null || puntoId.isBlank() || r.getPuntoTransporte().getId().equals(puntoId))
                .toList();
        if (rutas.isEmpty()) {
            return List.of();
        }
        LocalDateTime desde = fecha == null ? ahora : fecha.atStartOfDay();
        LocalDateTime hasta = fecha == null ? ahora.plusDays(DIAS_BUSQUEDA_POR_DEFECTO) : fecha.plusDays(1).atStartOfDay();

        Comparator<Salida> comparador = "precio".equalsIgnoreCase(orden)
                ? Comparator.comparingDouble(Salida::getPrecioBase).thenComparing(Salida::getFechaHora)
                : Comparator.comparing(Salida::getFechaHora);

        return salidaRepository.findByRutaInAndFechaHoraBetweenOrderByFechaHora(rutas, desde, hasta).stream()
                .filter(s -> s.esFutura(ahora))
                .sorted(comparador)
                .map(SalidaResponse::desde)
                .toList();
    }

    /** HU_009: estado de cada asiento. */
    public AsientosResponse asientos(String id) {
        Salida salida = buscar(id);
        int capacidad = salida.getBus().getCapacidad();
        List<AsientosResponse.Asiento> asientos = IntStream.rangeClosed(1, capacidad)
                .mapToObj(n -> new AsientosResponse.Asiento(n, salida.estaOcupado(n)))
                .toList();
        return new AsientosResponse(salida.getId(), capacidad, salida.asientosLibres(), asientos);
    }

    /** HU_015: compara de 2 a 4 salidas y marca la más barata y la más rápida. */
    public ComparacionResponse comparar(List<String> ids, TipoPasajero tipo) {
        TipoPasajero tipoPasajero = tipo == null ? TipoPasajero.GENERAL : tipo;
        List<Salida> salidas = ids.stream().distinct().map(this::buscar).toList();
        ComparacionSalidas comparacion = new ComparacionSalidas(salidas);
        Salida masBarata = comparacion.masBarata(tipoPasajero);
        Salida masRapida = comparacion.masRapida();

        List<ComparacionResponse.Opcion> opciones = salidas.stream().map(s -> {
            Map<TipoPasajero, Double> precios = new EnumMap<>(TipoPasajero.class);
            for (TipoPasajero t : TipoPasajero.values()) {
                precios.put(t, comparacion.precioFinal(s, t));
            }
            return new ComparacionResponse.Opcion(SalidaResponse.desde(s), precios,
                    s.getId().equals(masBarata.getId()), s.getId().equals(masRapida.getId()));
        }).toList();

        return new ComparacionResponse(comparacion.getDestino(), tipoPasajero, masBarata.getId(), masRapida.getId(), opciones);
    }
}
