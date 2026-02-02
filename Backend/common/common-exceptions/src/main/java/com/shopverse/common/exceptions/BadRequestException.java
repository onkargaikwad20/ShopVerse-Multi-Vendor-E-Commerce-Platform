package com.shopverse.common.exceptions;

public class BadRequestException extends ApiException {
    public BadRequestException(String message) {
        super(message, "BAD_REQUEST");
    }
}
