package com.shopverse.common.dtos.events;

import lombok.Data;

@Data
public class PaymentSuccessEvent {
    private String paymentId;
    private String orderId;
    private Long userId;
    private double amount;
    private long timestamp;
}
