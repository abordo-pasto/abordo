package com.abordo.config;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.abordo.model.*;
import com.abordo.model.tarifa.FabricaTarifas;
import com.abordo.repository.*;

/**
 * Carga datos de prueba la primera vez que arranca la aplicación (base vacía):
 * los tres puntos de transporte, empresas, buses, rutas, salidas de la próxima semana y cuentas de prueba.
 */
@Component
public class DatosIniciales implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatosIniciales.class);

    private final boolean activo;
    private final UsuarioRepository usuarios;
    private final PuntoTransporteRepository puntos;
    private final EmpresaRepository empresas;
    private final BusRepository buses;
    private final RutaRepository rutas;
    private final SalidaRepository salidas;
    private final TiqueteRepository tiquetes;
    private final PasswordEncoder codificador;
    private final Clock reloj;

    public DatosIniciales(@Value("${abordo.datos-prueba}") boolean activo, UsuarioRepository usuarios,
                          PuntoTransporteRepository puntos, EmpresaRepository empresas, BusRepository buses,
                          RutaRepository rutas, SalidaRepository salidas, TiqueteRepository tiquetes,
                          PasswordEncoder codificador, Clock reloj) {
        this.activo = activo;
        this.usuarios = usuarios;
        this.puntos = puntos;
        this.empresas = empresas;
        this.buses = buses;
        this.rutas = rutas;
        this.salidas = salidas;
        this.tiquetes = tiquetes;
        this.codificador = codificador;
        this.reloj = reloj;
    }

    @Override
    public void run(String... args) {
        if (!activo || usuarios.count() > 0) {
            return;
        }
        log.info("Base vacía: cargando datos de prueba de Abordo");

        // Puntos de transporte de Pasto
        PuntoTransporte terminal = puntos.save(new PuntoTransporte("Terminal de Transportes de Pasto",
                "Carrera 6 con Calle 16, Pasto", "Todos los días de 4:00 a. m. a 10:00 p. m.",
                "Rutas intermunicipales y nacionales"));
        PuntoTransporte mixto = puntos.save(new PuntoTransporte("Terminal Mixto",
                "Sector Potrerillo, Pasto", "Lunes a sábado de 5:00 a. m. a 7:00 p. m.",
                "Pueblos y veredas cercanas"));
        PuntoTransporte torobajo = puntos.save(new PuntoTransporte("Terminal Torobajo",
                "Sector Torobajo, salida al norte, Pasto", "Todos los días de 5:00 a. m. a 8:00 p. m.",
                "Municipios del norte de Nariño"));

        // Empresas transportadoras
        EmpresaTransportadora cootranar = empresas.save(new EmpresaTransportadora("Cootranar", "800123456-1", "6027201010"));
        EmpresaTransportadora transipiales = empresas.save(new EmpresaTransportadora("Transipiales", "800234567-2", "6027202020"));
        EmpresaTransportadora coomixtos = empresas.save(new EmpresaTransportadora("Coomixtos Pasto", "800345678-3", "6027203030"));
        EmpresaTransportadora norte = empresas.save(new EmpresaTransportadora("Transportes del Norte", "800456789-4", "6027204040"));

        // Cuentas de prueba
        usuarios.save(new Administrador("Administrador Abordo", "admin@abordo.com", codificador.encode("admin123")));
        Pasajero pasajero = usuarios.save(new Pasajero("Pasajero de Prueba", "pasajero@abordo.com",
                codificador.encode("pasajero123"), "1085000000"));
        usuarios.save(new OperadorEmpresa("Operador Cootranar", "operador@cootranar.com", codificador.encode("operador123"), cootranar));
        usuarios.save(new OperadorEmpresa("Operador Transipiales", "operador@transipiales.com", codificador.encode("operador123"), transipiales));
        usuarios.save(new OperadorEmpresa("Operador Coomixtos", "operador@coomixtos.com", codificador.encode("operador123"), coomixtos));
        usuarios.save(new OperadorEmpresa("Operador del Norte", "operador@norte.com", codificador.encode("operador123"), norte));

        // Buses
        Bus c1 = buses.save(new Bus("SNA123", 40, TipoServicio.PREFERENCIAL, cootranar));
        Bus c2 = buses.save(new Bus("SNB456", 30, TipoServicio.BASICO, cootranar));
        Bus t1 = buses.save(new Bus("TPI789", 42, TipoServicio.DOS_PISOS, transipiales));
        Bus t2 = buses.save(new Bus("TPJ321", 36, TipoServicio.PREFERENCIAL, transipiales));
        Bus m1 = buses.save(new Bus("MXA111", 20, TipoServicio.BASICO, coomixtos));
        Bus n1 = buses.save(new Bus("NRT222", 24, TipoServicio.BASICO, norte));
        Bus n2 = buses.save(new Bus("NRT333", 16, TipoServicio.BASICO, norte));

        // Rutas: [ruta, bus, precio base, horas de salida]
        record Plan(Ruta ruta, Bus bus, double precio, int... horas) { }
        List<Plan> planes = List.of(
                new Plan(rutas.save(new Ruta("Ipiales", 120, terminal, cootranar)), c1, 25000, 6, 10, 14, 18),
                new Plan(rutas.save(new Ruta("Cali", 540, terminal, cootranar)), c2, 75000, 7, 20),
                new Plan(rutas.save(new Ruta("Ipiales", 110, terminal, transipiales)), t2, 27000, 7, 12, 16),
                new Plan(rutas.save(new Ruta("Bogotá", 1200, terminal, transipiales)), t1, 150000, 15),
                new Plan(rutas.save(new Ruta("Chachagüí", 45, mixto, coomixtos)), m1, 8000, 6, 9, 13, 17),
                new Plan(rutas.save(new Ruta("Sandoná", 90, torobajo, norte)), n1, 12000, 6, 11, 16),
                new Plan(rutas.save(new Ruta("La Florida", 60, torobajo, norte)), n2, 9000, 7, 12, 17),
                new Plan(rutas.save(new Ruta("Genoy", 30, torobajo, norte)), n2, 5000, 8, 14));

        // Salidas para hoy y los próximos 7 días
        LocalDate hoy = LocalDate.now(reloj);
        List<Salida> creadas = new ArrayList<>();
        for (int dia = 0; dia <= 7; dia++) {
            for (Plan plan : planes) {
                for (int hora : plan.horas()) {
                    LocalDateTime fechaHora = LocalDateTime.of(hoy.plusDays(dia), LocalTime.of(hora, 0));
                    creadas.add(new Salida(fechaHora, plan.precio(), plan.ruta(), plan.bus()));
                }
            }
        }
        salidas.saveAll(creadas);

        // Dos tiquetes del pasajero de prueba para que el reporte de ventas tenga datos
        LocalDateTime ahora = LocalDateTime.now(reloj);
        creadas.stream().filter(s -> s.esFutura(ahora.plusHours(24))).limit(2).forEach(salida -> {
            Tiquete tiquete = salida.emitirTiquete(pasajero, 5, TipoPasajero.ESTUDIANTE,
                    FabricaTarifas.para(TipoPasajero.ESTUDIANTE), ahora);
            salidas.save(salida);
            tiquetes.save(tiquete);
        });

        log.info("Datos de prueba cargados: {} salidas", creadas.size());
    }
}
