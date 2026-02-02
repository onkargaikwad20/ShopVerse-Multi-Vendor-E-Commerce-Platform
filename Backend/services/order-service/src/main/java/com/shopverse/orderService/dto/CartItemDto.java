package com.shopverse.orderService.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDto {
    private Long id; // For response
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double price;
    private String imageUrl;
}
