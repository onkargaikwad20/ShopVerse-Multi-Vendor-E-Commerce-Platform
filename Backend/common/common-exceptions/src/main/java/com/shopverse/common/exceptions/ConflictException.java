package com.shopverse.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(message, "CONFLICT");
    }
}
