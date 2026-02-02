package com.shopverse.common.dtos.domain;

import lombok.Data;

@Data
public class InventoryDTO {
    private Long productId;
    private int stock;
    private int reserved;
}
