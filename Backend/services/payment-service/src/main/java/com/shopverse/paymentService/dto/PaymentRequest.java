package com.shopverse.paymentService.dto;

import lombok.Data;

@Data
public class PaymentRequest {

    private Long orderId;
    private Long amount;
    private String productName;
}
