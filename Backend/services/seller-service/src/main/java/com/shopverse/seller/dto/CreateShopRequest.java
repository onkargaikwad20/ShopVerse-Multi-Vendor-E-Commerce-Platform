package com.shopverse.seller.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateShopRequest {
    private String shopName;
    private String description;
    private String address;
    private String shopBannerUrl;      // ADD THIS
    private List<String> categories;   // Or String if comma-separated
}
