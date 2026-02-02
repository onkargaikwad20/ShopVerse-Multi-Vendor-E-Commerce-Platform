package com.shopverse.seller.dto;

import com.shopverse.seller.entity.Category;
import com.shopverse.seller.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopResponse {

    private Long id;
    private String shopName;
    private String description;
    private String address;
    private String shopBannerUrl;
    private Set<String> categories;

    public static ShopResponse from(Shop shop) {
        return new ShopResponse(
                shop.getId(),
                shop.getShopName(),
                shop.getDescription(),
                shop.getAddress(),
                shop.getShopBannerUrl(),
                shop.getCategories()
                        .stream()
                        .map(Category::getName)
                        .collect(Collectors.toSet())
        );
    }
}
