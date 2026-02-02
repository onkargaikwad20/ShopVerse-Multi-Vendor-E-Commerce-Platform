package com.shopverse.common.dtos.domain;

import lombok.Data;

@Data
public class SellerDTO {
    private Long id;
    private String storeName;
    private String ownerName;
    private String email;
    private String phone;
    private boolean approved;
}
