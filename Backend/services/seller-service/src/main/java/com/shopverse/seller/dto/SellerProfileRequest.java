package com.shopverse.seller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SellerProfileRequest {

    @Email
    @NotBlank
    private String email;  // from auth-service JWT

    @NotBlank
    private String name;

    @NotBlank
    private String phone;
}
