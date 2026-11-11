package com.abordo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Clase base de los usuarios con cuenta. Pasajero, OperadorEmpresa y Administrador heredan de ella.
 * Las tres se guardan en la misma colección "usuarios"; Spring guarda el tipo en el campo _class.
 */
@Document(collection = "usuarios")
public abstract class Usuario {

    @Id
    private String id;
    private String nombre;
    @Indexed(unique = true)
    private String correo;
    private String contrasenaCifrada;
    private Rol rol;
    private boolean activo = true;

    protected Usuario() {
    }

    protected Usuario(String nombre, String correo, String contrasenaCifrada, Rol rol) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasenaCifrada = contrasenaCifrada;
        this.rol = rol;
    }

    /** Experto: el usuario conoce su contraseña cifrada, así que él la verifica. */
    public boolean verificarContrasena(String clave, PasswordEncoder codificador) {
        return codificador.matches(clave, contrasenaCifrada);
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasenaCifrada() { return contrasenaCifrada; }
    public void setContrasenaCifrada(String contrasenaCifrada) { this.contrasenaCifrada = contrasenaCifrada; }
    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }
    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
