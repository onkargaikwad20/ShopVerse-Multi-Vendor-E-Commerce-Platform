package com.shopverse.common.exceptions;

public class NotFoundException extends ApiException {
    public NotFoundException(String message) {
        super(message, "NOT_FOUND");
    }
}
