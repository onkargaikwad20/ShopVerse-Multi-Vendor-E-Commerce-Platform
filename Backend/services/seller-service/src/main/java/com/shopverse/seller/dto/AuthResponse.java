package com.shopverse.seller.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private Long userId;
    private String email;
    private String role;
}
