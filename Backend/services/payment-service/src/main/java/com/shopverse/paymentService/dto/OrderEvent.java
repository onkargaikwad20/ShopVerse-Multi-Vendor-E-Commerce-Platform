package com.shopverse.paymentService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEvent {
    private Long orderId;
    private String status;
    private Double amount;
    private String email;
    private String productName;
}
