package com.shopverse.seller.dto;

import com.shopverse.seller.entity.Seller;
import lombok.Data;

@Data
public class SellerProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String kycStatus;
    private String address;
    private String businessDetails;

    public static SellerProfileResponse from(Seller seller) {
        SellerProfileResponse r = new SellerProfileResponse();
        r.setId(seller.getId());
        r.setName(seller.getName());
        r.setEmail(seller.getEmail());
        r.setPhone(seller.getPhone());
        r.setKycStatus(seller.getKycStatus().name());
        r.setAddress(seller.getAddress());
        r.setBusinessDetails(seller.getBusinessDetails());
        return r;
    }
}
