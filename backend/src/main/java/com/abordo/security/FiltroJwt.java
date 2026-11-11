package com.abordo.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.abordo.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/** Lee el encabezado "Authorization: Bearer <token>" y deja al usuario autenticado con su rol. */
@Component
public class FiltroJwt extends OncePerRequestFilter {

    private final JwtServicio jwtServicio;
    private final UsuarioRepository usuarioRepository;

    public FiltroJwt(JwtServicio jwtServicio, UsuarioRepository usuarioRepository) {
        this.jwtServicio = jwtServicio;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain cadena)
            throws ServletException, IOException {
        String encabezado = request.getHeader("Authorization");
        if (encabezado != null && encabezado.startsWith("Bearer ")) {
            String usuarioId = jwtServicio.obtenerUsuarioId(encabezado.substring(7));
            if (usuarioId != null) {
                usuarioRepository.findById(usuarioId)
                        .filter(usuario -> usuario.isActivo())
                        .ifPresent(usuario -> {
                            var autoridad = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name());
                            var autenticacion = new UsernamePasswordAuthenticationToken(usuario, null, List.of(autoridad));
                            SecurityContextHolder.getContext().setAuthentication(autenticacion);
                        });
            }
        }
        cadena.doFilter(request, response);
    }
}
