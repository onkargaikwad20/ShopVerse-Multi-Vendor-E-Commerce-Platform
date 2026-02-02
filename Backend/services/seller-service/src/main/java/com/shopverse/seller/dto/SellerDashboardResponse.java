package com.shopverse.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDashboardResponse {

    private Long sellerId;
    private String name;
    private String email;
    private String phone;

    private String kycStatus;   // PENDING / APPROVED / REJECTED

    private ShopResponse shop;  // nullable if shop not created

    private int productsCreated;

    private EarningsResponse earnings;
}
