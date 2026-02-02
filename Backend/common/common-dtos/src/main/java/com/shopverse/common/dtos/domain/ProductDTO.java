package com.shopverse.common.dtos.domain;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private Long sellerId;
}
