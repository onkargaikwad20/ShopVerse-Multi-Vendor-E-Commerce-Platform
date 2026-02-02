package com.shopverse.common.exceptions;

import com.shopverse.common.dtos.base.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if ("CONFLICT".equals(ex.getErrorCode())) {
            status = HttpStatus.CONFLICT;
        }

        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                ex.getErrorCode(),
                status.value());
        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflictException(ConflictException ex) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                ex.getErrorCode(),
                HttpStatus.CONFLICT.value());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                "INTERNAL_SERVER_ERROR",
                HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
