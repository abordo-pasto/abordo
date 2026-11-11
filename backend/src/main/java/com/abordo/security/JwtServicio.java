package com.abordo.security;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.abordo.model.Usuario;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/** Crea y valida los tokens JWT que identifican al usuario en cada petición. */
@Component
public class JwtServicio {

    private final SecretKey clave;
    private final Duration validez;

    public JwtServicio(@Value("${abordo.jwt.secreto}") String secreto,
                       @Value("${abordo.jwt.horas-validez}") long horasValidez) {
        this.clave = Keys.hmacShaKeyFor(secreto.getBytes(StandardCharsets.UTF_8));
        this.validez = Duration.ofHours(horasValidez);
    }

    public String generarToken(Usuario usuario) {
        Date ahora = new Date();
        return Jwts.builder()
                .subject(usuario.getId())
                .claim("rol", usuario.getRol().name())
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + validez.toMillis()))
                .signWith(clave)
                .compact();
    }

    /** Devuelve el id del usuario del token, o null si el token no es válido o venció. */
    public String obtenerUsuarioId(String token) {
        try {
            return Jwts.parser().verifyWith(clave).build().parseSignedClaims(token).getPayload().getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
