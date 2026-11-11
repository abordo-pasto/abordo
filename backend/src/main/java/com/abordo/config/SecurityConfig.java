package com.abordo.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.abordo.security.FiltroJwt;

/** Qué rutas son públicas y qué rol necesita cada una (RNF_004). */
@Configuration
public class SecurityConfig {

    private static final String ADMIN = "ADMINISTRADOR";
    private static final String OPERADOR = "OPERADOR";
    private static final String PASAJERO = "PASAJERO";

    @Bean
    public SecurityFilterChain filtros(HttpSecurity http, FiltroJwt filtroJwt) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Documentación y estado
                .requestMatchers("/", "/api/estado", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                // Cuenta (HU_001, HU_002)
                .requestMatchers(HttpMethod.POST, "/api/auth/registro", "/api/auth/login").permitAll()
                // Consultas públicas para el visitante (HU_014, HU_008, HU_015, HU_009)
                .requestMatchers(HttpMethod.GET, "/api/puntos/**", "/api/empresas/**", "/api/rutas/destinos",
                        "/api/salidas/buscar", "/api/salidas/comparar", "/api/salidas/*/asientos").permitAll()
                // Administrador (HU_013, HU_003, HU_016)
                .requestMatchers("/api/puntos/**", "/api/empresas/**", "/api/operadores/**").hasRole(ADMIN)
                // Operador de empresa (HU_004, HU_005, HU_006)
                .requestMatchers("/api/buses/**", "/api/rutas/**", "/api/salidas/**").hasRole(OPERADOR)
                // Pasajero (HU_010, HU_011, HU_012)
                .requestMatchers("/api/tiquetes/**").hasRole(PASAJERO)
                // Reportes (HU_007)
                .requestMatchers("/api/reportes/**").hasAnyRole(OPERADOR, ADMIN)
                .anyRequest().authenticated())
            .exceptionHandling(e -> e
                .authenticationEntryPoint((req, res, ex) -> escribirError(res, 401, "No autorizado", "Debe iniciar sesión"))
                .accessDeniedHandler((req, res, ex) -> escribirError(res, 403, "Prohibido", "No tiene permiso para esta operación")))
            .addFilterBefore(filtroJwt, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    private static void escribirError(jakarta.servlet.http.HttpServletResponse res, int estado, String error,
                                      String mensaje) throws java.io.IOException {
        res.setStatus(estado);
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write("{\"estado\":" + estado + ",\"error\":\"" + error + "\",\"mensaje\":\"" + mensaje + "\"}");
    }

    @Bean
    public PasswordEncoder codificador() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${abordo.cors.origenes}") String origenes) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.stream(origenes.split(",")).map(String::trim).toList());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", config);
        return fuente;
    }
}
