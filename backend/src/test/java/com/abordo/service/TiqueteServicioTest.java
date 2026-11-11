package com.abordo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.abordo.dto.CompraRequest;
import com.abordo.dto.TiqueteResponse;
import com.abordo.exception.PagoRechazadoException;
import com.abordo.integracion.PasarelaPagos;
import com.abordo.integracion.ResultadoPago;
import com.abordo.model.*;
import com.abordo.repository.SalidaRepository;
import com.abordo.repository.TiqueteRepository;
import com.abordo.security.UsuarioActual;

/** HU_010: la venta usa la pasarela a través de su interfaz, así que se puede simular con Mockito. */
class TiqueteServicioTest {

    private static final ZoneId BOGOTA = ZoneId.of("America/Bogota");
    private static final LocalDateTime AHORA = LocalDateTime.of(2026, 11, 18, 8, 0);

    private final TiqueteRepository tiquetes = mock(TiqueteRepository.class);
    private final SalidaRepository salidas = mock(SalidaRepository.class);
    private final SalidaServicio salidaServicio = mock(SalidaServicio.class);
    private final PasarelaPagos pasarela = mock(PasarelaPagos.class);
    private final UsuarioActual usuarioActual = mock(UsuarioActual.class);
    private final Clock reloj = Clock.fixed(AHORA.atZone(BOGOTA).toInstant(), BOGOTA);

    private TiqueteServicio servicio;
    private Salida salida;

    @BeforeEach
    void preparar() {
        servicio = new TiqueteServicio(tiquetes, salidas, salidaServicio, pasarela, usuarioActual, reloj);
        EmpresaTransportadora empresa = new EmpresaTransportadora("Cootranar", "800", "1");
        Ruta ruta = new Ruta("Ipiales", 120, new PuntoTransporte("Terminal", "x", "x", "x"), empresa);
        salida = new Salida(AHORA.plusDays(1), 50000, ruta, new Bus("ABC123", 40, TipoServicio.BASICO, empresa));
        salida.setId("s1");
        when(usuarioActual.pasajero()).thenReturn(new Pasajero("Ana", "ana@correo.com", "x", "1"));
        when(salidaServicio.buscar("s1")).thenReturn(salida);
        when(tiquetes.save(any())).thenAnswer(i -> i.getArgument(0));
    }

    @Test
    void pagoAprobadoEmiteElTiquete() {
        when(pasarela.autorizar(anyString(), eq(53000.0), anyString())).thenReturn(new ResultadoPago(true, "AUT-1", "ok"));

        TiqueteResponse tiquete = servicio.comprar(new CompraRequest("s1", 3, TipoPasajero.GENERAL, "4111111111111111"));

        assertEquals(53000, tiquete.precioFinal());
        assertEquals(EstadoTiquete.ACTIVO, tiquete.estado());
        verify(salidas).save(salida);
    }

    @Test
    void pagoRechazadoNoEmiteElTiquete() {
        when(pasarela.autorizar(anyString(), anyDouble(), anyString())).thenReturn(new ResultadoPago(false, null, "Rechazado"));

        assertThrows(PagoRechazadoException.class,
                () -> servicio.comprar(new CompraRequest("s1", 3, TipoPasajero.GENERAL, "4000000000000000")));
        verify(tiquetes, never()).save(any());
        verify(salidas, never()).save(any());
    }
}
