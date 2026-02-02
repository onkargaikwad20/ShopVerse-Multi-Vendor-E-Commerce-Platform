package com.shopverse.orderService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDto {
    @com.fasterxml.jackson.annotation.JsonProperty("productId")
    private Long productId;
    
    @com.fasterxml.jackson.annotation.JsonProperty("productName")
    private String productName;
    
    @com.fasterxml.jackson.annotation.JsonProperty("quantity")
    private Integer quantity;
    
    @com.fasterxml.jackson.annotation.JsonProperty("price")
    private Double price;
}
