package com.shopverse.auth.dto;
import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class OtpRequest {
    @NotBlank private String phone;
}
