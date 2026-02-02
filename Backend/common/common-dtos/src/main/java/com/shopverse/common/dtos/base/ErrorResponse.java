package com.shopverse.common.dtos.base;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private String errorCode;
    private int status;
}
