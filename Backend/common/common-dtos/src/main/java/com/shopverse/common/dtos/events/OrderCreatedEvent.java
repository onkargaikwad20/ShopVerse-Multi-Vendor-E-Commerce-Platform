package com.shopverse.common.dtos.events;

import lombok.Data;

@Data
public class OrderCreatedEvent {
    private String orderId;
    private Long userId;
    private Long sellerId;
    private double totalAmount;
    private long timestamp;
}
