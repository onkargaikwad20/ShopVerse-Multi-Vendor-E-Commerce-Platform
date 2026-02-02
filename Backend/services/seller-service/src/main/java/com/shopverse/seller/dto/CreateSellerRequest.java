package com.shopverse.seller.dto;

import lombok.Data;

@Data
public class CreateSellerRequest {
    private String name;
    private String email;
    private String phone;
    private String address;          // ADD THIS
    private String businessDetails;  // ADD THIS
}
