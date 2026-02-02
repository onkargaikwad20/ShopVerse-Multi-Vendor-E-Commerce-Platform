package com.shopverse.seller.dto;

import lombok.Data;

@Data
public class UpdateSellerRequest {
    private String name;
    private String phone;
    private String address;
    private String businessDetails;   // ADD THIS
}
