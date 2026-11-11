package com.abordo.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.abordo.dto.ErrorResponse;

/** Convierte las excepciones en respuestas JSON con el código HTTP correcto y un mensaje en español (RNF_006). */
@RestControllerAdvice
public class ManejadorErrores {

    @ExceptionHandler(ReglaNegocioException.class)
    public ResponseEntity<ErrorResponse> reglaNegocio(ReglaNegocioException e) {
        return responder(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(NoAutorizadoException.class)
    public ResponseEntity<ErrorResponse> noAutorizado(NoAutorizadoException e) {
        return responder(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(PagoRechazadoException.class)
    public ResponseEntity<ErrorResponse> pagoRechazado(PagoRechazadoException e) {
        return responder(HttpStatus.PAYMENT_REQUIRED, e.getMessage());
    }

    @ExceptionHandler(AccesoDenegadoException.class)
    public ResponseEntity<ErrorResponse> accesoDenegado(AccesoDenegadoException e) {
        return responder(HttpStatus.FORBIDDEN, e.getMessage());
    }

    @ExceptionHandler(NoEncontradoException.class)
    public ResponseEntity<ErrorResponse> noEncontrado(NoEncontradoException e) {
        return responder(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(ConflictoException.class)
    public ResponseEntity<ErrorResponse> conflicto(ConflictoException e) {
        return responder(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ErrorResponse> duplicado(DuplicateKeyException e) {
        return responder(HttpStatus.CONFLICT, "El registro ya existe");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validacion(MethodArgumentNotValidException e) {
        List<String> detalles = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        ErrorResponse cuerpo = new ErrorResponse(400, "Datos inválidos", "Revise los datos enviados", detalles, LocalDateTime.now());
        return ResponseEntity.badRequest().body(cuerpo);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class,
            MissingServletRequestParameterException.class})
    public ResponseEntity<ErrorResponse> peticionMalFormada(Exception e) {
        return responder(HttpStatus.BAD_REQUEST, "La petición tiene un formato inválido o le falta un parámetro");
    }

    private ResponseEntity<ErrorResponse> responder(HttpStatus estado, String mensaje) {
        return ResponseEntity.status(estado).body(ErrorResponse.de(estado.value(), estado.getReasonPhrase(), mensaje));
    }
}
