package com.shopverse.common.dtos.security;

import lombok.Data;

@Data
public class JwtValidationResponse {
    private boolean valid;
    private String userEmail;
    private String userId;
    private String role;
}
